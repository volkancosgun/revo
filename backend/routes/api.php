<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'admin',
], function ($router) {

    Route::get('allUserList', 'AdminController@allUserList');
    Route::post('editUser', 'AdminController@edituser');
    Route::get('sites', 'AdminController@siteList');
});

Route::group([
    'prefix' => 'accounts',

], function ($router) {

    Route::get('list', 'Accounts\AccountsController@index');
    Route::get('customListing', 'Accounts\AccountsController@customListing');
    Route::get('totals', 'Accounts\AccountsController@totalCounts');
    Route::get('listing/{cat?}/{ref?}', 'Accounts\AccountsController@customList');
    Route::get('changeStarred/{account_id?}/{starred?}', 'Accounts\AccountsController@starredChange');
    Route::get('changeRead/{account_id?}/{read?}', 'Accounts\AccountsController@readChange');
    Route::post('deleting', 'Accounts\AccountsController@deleteAccounts');
    Route::post('moving', 'Accounts\AccountsController@moveAccounts');
    Route::post('store/{update?}', 'Accounts\AccountsController@store');
    Route::post('webstore', 'Accounts\AccountsController@storeWeb');

});

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth',

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::get('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::get('test', 'HomeController@test');

});
