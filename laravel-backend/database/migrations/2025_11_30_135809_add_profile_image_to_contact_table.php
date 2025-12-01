<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_table', function (Blueprint $table) {
            $table->string('profile_image')->nullable()->after('maritial_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_table', function (Blueprint $table) {
            $table->dropColumn('profile_image');
        });
    }
};
