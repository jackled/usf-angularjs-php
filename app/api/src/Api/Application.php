<?php

namespace Api;

use Api\Model\Features;
use \Slim\Slim;
use \Exception;
use \USF\auth\SlimAuthMiddleware;

// TODO Move all "features" things to a class with index() and get() methods
class Application extends Slim
{
    public $configDirectory;
    public $config;

    protected function initConfig()
    {
        $config = array();
        if (!file_exists($this->configDirectory) || !is_dir($this->configDirectory)) {
            throw new Exception('Config directory is missing: ' . $this->configDirectory, 500);
        }
        foreach (preg_grep('/\\.php$/', scandir($this->configDirectory)) as $filename) {
            $config = array_replace_recursive($config, include $this->configDirectory . '/' . $filename);
        }
        return $config;
    }

    public function __construct(array $userSettings = array(), $configDirectory = 'config')
    {
        // Slim initialization
        parent::__construct($userSettings);
        $this->config('debug', false);
        $this->notFound(function () {
            $this->handleNotFound();
        });
        $this->error(function ($e) {
            $this->handleException($e);
        });

        // Config
        $this->configDirectory = __DIR__ . '/../../' . $configDirectory;
        $this->config = $this->initConfig();

		//Get app environment variables
		$this->environment['auth.config.cas'] = array ('environment' => 'development');
		$this->environment['auth.config.token'] = array ('app_id' => 'https://dev.it.usf.edu/~jack/ExampleApp',
                                   'app_key' => 'secretKey',
                                   'token_url' => 'https://authtest.it.usf.edu/AuthTransferService/webtoken');


		//Authenticate requests to /api/* with CAS and permit all users
		$this->environment['auth.interceptUrlMap'] = array('GET' => array( '/features' => array('authN' => 'token',
																			'authZ' => 'permitAll')
														   )
											 );
		//Add the Auth Middleware
		$this->add(new SlimAuthMiddleware());
		

        // /features
        $this->get('/features', function () {
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures()));
        });

        $this->get('/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });
    }

    public function handleNotFound()
    {
        throw new Exception(
            'Resource ' . $this->request->getResourceUri() . ' using '
            . $this->request->getMethod() . ' method does not exist.',
            404
        );
    }

    public function handleException(Exception $e)
    {
        $status = $e->getCode();
        $statusText = \Slim\Http\Response::getMessageForCode($status);
        if ($statusText === null) {
            $status = 500;
            $statusText = 'Internal Server Error';
        }

        $this->response->setStatus($status);
        $this->response->headers->set('Content-Type', 'application/json');
        $this->response->setBody(json_encode(array(
            'status' => $status,
            'statusText' => preg_replace('/^[0-9]+ (.*)$/', '$1', $statusText),
            'description' => $e->getMessage(),
        )));
    }

    /**
     * @return \Slim\Http\Response
     */
    public function invoke()
    {
        foreach ($this->middleware as $middleware) {
            $middleware->call();
        }
        $this->response()->finalize();
        return $this->response();
    }
}
