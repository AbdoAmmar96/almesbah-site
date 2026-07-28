<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        // There is no named `login` route — the React dashboard renders its own
        // login screen. Without this, a guest hitting /dashboard/api/* from the
        // address bar blows up with "Route [login] not defined" (500) instead of
        // landing on the login screen. XHR callers still get a clean 401.
        $middleware->redirectGuestsTo('/dashboard');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // The old WordPress was injected with 300+ casino spam posts.
        // Any request to those slugs must die with 410 Gone so Google
        // drops them fast instead of soft-404ing for months.
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            if (preg_match('/casino|free-spins|no-deposit/i', $request->path())) {
                return response('Gone', 410);
            }
            return null;
        });
    })->create();
