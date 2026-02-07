<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCPDF;
use App\Models\Sales;
use Illuminate\Support\Facades\DB;

class PdfController extends Controller
{
    public function downloadPDF($id)
    {
        // Fetch record from database - FIXED: Use parameter binding to prevent SQL injection
        $sale_products = DB::select("SELECT * FROM sales_items WHERE sale_id = ?", [$id]);
        
        $sale = Sales::find($id);

        if (!$sale) {
            return response()->json(['error' => 'Sale not found'], 404);
        }

        // new PDF document
        $pdf = new TCPDF('P', 'mm', 'A5', true, 'UTF-8', false);
        $pdf->SetCreator('Laravel TCPDF');
        $pdf->SetAuthor('Your Company');
        $pdf->SetTitle('Sales Bill #' . $id);
        $pdf->SetMargins(15, 15, 15);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $pdf->AddPage();
        
        // full-page border
        $pdf->SetLineWidth(0.5);
        $pdf->SetDrawColor(0, 0, 0);
        $w = $pdf->getPageWidth() - 10;
        $h = $pdf->getPageHeight() - 10;
        $pdf->Rect(5, 5, $w, $h, 'D');

        // Header section
        $pdf->SetFillColor(108, 117, 125);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('helvetica', 'B', 9.5);

        $y = 5;
        $pdf->MultiCell(52, 7, 'To : ', 0, 'L', false, 1, 6, $y);
        
        $y += 5;
        $pdf->MultiCell(0, 7, 'Customer Name: ' . $sale->customer_name, 0, 'L', false, 1, 8.5, $y);

        // Sales Bill header
        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('helvetica', 'B', 10.5);
        $pdf->SetFillColor(108, 117, 125); 
        $pdf->MultiCell(42.5, 7, 'SALES Bill', 0, 'C', true, 1, 100, 5);
        
        // Bill details
        $y = 13;
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('helvetica', '', 9);
        $pdf->MultiCell(0, 7, 'Bill No : ' . $sale->id, 0, 'L', false, 1, 100, $y);
        
        $y += 5;
        $pdf->MultiCell(0, 7, 'Bill Date : ' . $sale->created_at, 0, 'L', false, 1, 100, $y);

        // Table header - FIXED: Proper column widths and positions
        $y = 33;
        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->SetFillColor(108, 117, 125);
        
        // Define column positions and widths
        $col1_x = 6;
        $col1_w = 66;
        $col2_x = $col1_x + $col1_w;
        $col2_w = 20;
        $col3_x = $col2_x + $col2_w;
        $col3_w = 25;
        $col4_x = $col3_x + $col3_w;
        $col4_w = 25;
        
        $pdf->MultiCell($col1_w, 7, 'Product Name', 1, 'L', true, 0, $col1_x, $y);
        $pdf->MultiCell($col2_w, 7, 'Qty', 1, 'C', true, 0, $col2_x, $y);
        $pdf->MultiCell($col3_w, 7, 'Price', 1, 'C', true, 0, $col3_x, $y);
        $pdf->MultiCell($col4_w, 7, 'Total', 1, 'C', true, 0, $col4_x, $y);
        
        // Table data - FIXED: Increment Y and reset X for each row
        $y += 7;
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('helvetica', '', 9);
        $grand_total_val = 0;
        foreach ($sale_products as $sale_prod) {
            $pdf->MultiCell($col1_w, 7, $sale_prod->item_name . '-' . $sale_prod->item_code, 1, 'L', false, 0, $col1_x, $y);
            $pdf->MultiCell($col2_w, 7, $sale_prod->qty, 1, 'C', false, 0, $col2_x, $y);
            $pdf->MultiCell($col3_w, 7, number_format($sale_prod->price, 2), 1, 'R', false, 0, $col3_x, $y);
            $pdf->MultiCell($col4_w, 7, number_format($sale_prod->total, 2), 1, 'R', false, 0, $col4_x, $y);
            $grand_total_val += $sale_prod->total;
            $y += 7; // FIXED: Increment Y position for next row
        }
        
        // Total row (optional)
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->MultiCell($col1_w + $col2_w + $col3_w, 7, 'Grand Total', 1, 'R', false, 0, $col1_x, $y);
        $pdf->MultiCell($col4_w, 7, number_format($grand_total_val ?? 0, 2), 1, 'R', false, 0, $col4_x, $y);

        $pdfContent = $pdf->Output("sale-$id.pdf", 'S');

        return response($pdfContent)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=\"sale-$id.pdf\"");
    }
}