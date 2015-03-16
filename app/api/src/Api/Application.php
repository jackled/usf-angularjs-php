<?php

namespace Api;

use Api\Model\Identity;
use Api\Model\Features;
use \Slim\Slim;
use \Exception;
use \USF\IdM\UsfConfig;
use \USF\auth\SlimAuthMiddleware;
use \USF\IdM\SlimLogMiddleware;
use \USF\IdM\UsfVipDatabase;


// TODO Move all "features" things to a class with index() and get() methods
class Application extends Slim
{
    public $configDirectory;
    public $config;

    public function __construct(array $userSettings = array(), $configDirectory = 'config')
    {
		// Slim initialization
        parent::__construct($userSettings);
		
		$this->notFound(function () {
            $this->handleNotFound();
        });
        $this->error(function ($e) {
            $this->handleException($e);
        });

        // Load config files
        $this->configDirectory = __DIR__ . '/../../' . $configDirectory;
		$this->config = new UsfConfig($this->configDirectory);
      
		// Security
		$this->environment['auth.config.cas'] = $this->config->casConfig;
		$this->environment['auth.config.token'] = $this->config->tokenConfig;
		$this->environment['auth.interceptUrlMap'] = $this->config->urlMapConfig;
		
		// Logging
		$this->environment['log.config'] = $this->config->logConfig;

		// Add the Middleware
		$this->add(new SlimAuthMiddleware());
		$this->add(new SlimLogMiddleware());

		// identity
        $this->put('/identity', function () {
			$name = $this->environment['principal.attributes']['GivenName'].' '.$this->environment['principal.attributes']['Surname'];
			if (in_array($this->config->entitlement, $this->environment['principal.entitlements'])) {
				$role = 'Admin';
			} else {
				$role = 'User';
			}
			$this->log->info('Identity: '.$name.' - '.$role);
			$this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode(array('name' => $name, 'role' => $role)));
        });
		
        // /features
        $this->get('/features', function () {
			$db = new UsfVipDatabase();
			
			$features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('get')));
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
		
		$this->put('/features', function () {
			$features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('put')));
        });
		
		$this->put('/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });
		
		$this->post('/features', function () {
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('post')));
        });
		
		$this->post('/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });
		
		$this->delete('/features', function () {
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures('delete')));
        });
		
		$this->delete('/features/:id', function ($id) {
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
