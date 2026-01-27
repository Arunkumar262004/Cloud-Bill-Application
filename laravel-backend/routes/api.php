<?php

use App\Http\Controllers\Authenticate_controller;
use App\Http\Controllers\dashboardcontroller;
use App\Http\Controllers\otp_login_page;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\Stock_controller;
use App\Http\Controllers\Contact_controller;
use App\Http\Controllers\Contact_bill_tcpdf;
use App\Http\Controllers\pay_slip_controller;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login',[Authenticate_controller::class,'login'])->name('Login_page');
Route::post('/logout',[Authenticate_controller::class,'logout']);
Route::post('/register',[Authenticate_controller::class,'Register']);

Route::post('/send-otp', [otp_login_page::class, 'generate_otp']);
Route::post('/confirm-otp', [otp_login_page::class, 'confirm_otp']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/download-pdf/{id}', [PdfController::class, 'downloadPDF']);
    Route::get('/contact-pdf/{id}', [Contact_bill_tcpdf::class, 'Download_Contact_PDF']);

    // Sales
    Route::post('/sales-create', [SalesController::class, 'Store_sales']);
    Route::get('/sales-get', [SalesController::class, 'Sales_my']);
    Route::get('/sales-get-by-id/{id}', [SalesController::class, 'Sales_get_value_in_db']);
    Route::put('/sales-update/{id}', [SalesController::class, 'Sales_update']);
    Route::delete('/sales-delete/{id}', [SalesController::class, 'Sales_delete']);

    // Stock
    Route::post('/stock-create', [Stock_controller::class, 'Store_Stock']);
    Route::get('/stock-get', [Stock_controller::class, 'Stock_my']);
    Route::get('/stock-get-by-id/{id}', [Stock_controller::class, 'Stock_get_value_in_db']);
    Route::put('/stock-update/{id}', [Stock_controller::class, 'Stock_update']);
    Route::delete('/stock-delete/{id}', [Stock_controller::class, 'Stock_delete']);
    Route::get('/dashboard-data', [dashboardcontroller::class, 'get_total_sales']);


    Route::post('/store-contact', [Contact_controller::class, 'Create_contact']);
    Route::get('/contact-data', [Contact_controller::class, 'Contact_my_page']);
    Route::get('/contact-get-by-id/{id}', [Contact_controller::class, 'Contact_get_value_in_db']);
    Route::put('/contact-update/{id}', [Contact_controller::class, 'Contact_update']);
    Route::delete('/contact-delete/{id}', [Contact_controller::class, 'Contact_delete']);


    Route::post('/payslip-store', [pay_slip_controller::class, 'Store_payslip']);
    Route::get('/payslip-get', [pay_slip_controller::class, 'Get_payslip']);
    Route::delete('/payslip-delete/{id}', [pay_slip_controller::class, 'Delete_payslip_id']);
    Route::get('/payslip-get_id/{id}', [pay_slip_controller::class, 'Get_payslip_by_id']);
    Route::put('/update_payslip-id/{id}', [pay_slip_controller::class, 'Update_user_by_id']);
    


});