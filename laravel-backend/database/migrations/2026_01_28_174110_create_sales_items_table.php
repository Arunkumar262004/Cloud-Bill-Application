<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('sales_items', function (Blueprint $table) {
            $table->id();

            // Foreign key to Sales_table
            $table->unsignedBigInteger('sale_id');

            $table->string('item_name');
            $table->string('item_code');
            $table->integer('qty');
            $table->integer('price');
            $table->integer('total');

            $table->timestamps();

            $table->foreign('sale_id')
                  ->references('id')
                  ->on('Sales_table')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_items');
    }
};