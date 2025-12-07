<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCPDF;
use App\Models\Contact_model;

class Contact_bill_tcpdf extends Controller
{
    public function Download_Contact_PDF($id)
    {
        // Fetch record from database
        $Contact = Contact_model::find($id);

        if (!$Contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }

        // Create new PDF document
        $pdf = new TCPDF('P', 'mm', 'A5', true, 'UTF-8', false);
        $pdf->SetCreator('Laravel TCPDF');
        $pdf->SetAuthor('Your Company');
        $pdf->SetTitle('Contact' . $Contact->id);
        $pdf->SetMargins(15, 15, 15);
        $pdf->setPrintHeader(false); // removes top header line
        $pdf->setPrintFooter(false); // removes bottom footer line

        $pdf->AddPage();
        // Draw full-page border
        $pdf->SetLineWidth(0.5);
        $pdf->SetDrawColor(0, 0, 0);
        $w = $pdf->getPageWidth() - 10;
        $h = $pdf->getPageHeight() - 10;
        $pdf->Rect(5, 5, $w, $h, 'D');

        $y = 5;


        // Title
        $pdf->SetTextColor(0, 0, 0);
        $x = 6;
        $pdf->SetFont('helvetica', 'B', 11);
$sply_y = $y + 1;
        $pdf->MultiCell(0, 7, 'CLOUD BILL APP      ', 0,  'L', false, 0, $x, $y += 1);
        $pdf->SetFont('helvetica', '', 9);

        $pdf->MultiCell(0, 7, '1/214 Western Street Chennai       ', 0,  'L', false, 0, $x, $y += 5);
       $pdf->MultiCell(0, 7, 'Tamil Nadu - India - 6000022', 0,  'L', false, 0, $x, $y += 5);
       $pdf->MultiCell(0, 7, 'arunkumar957877@gmail.com', 0,  'L', false, 0, $x, $y += 5);
       $pdf->MultiCell(0, 7, '9578777764', 0,  'L', false, 0, $x, $y += 5);

        $pdf->Line(5, $y += 5, 143, $y);

        $x = 8.5;

        $sply_y = $y + 1;
        $pdf->MultiCell(0, 7, 'Employee Name   :   ' . $Contact->employee_name, 0,  'L', false, 0, $x, $y += 1);
        $pdf->MultiCell(0, 7, 'Employee Code    :   ' . $Contact->employee_code, 0,  'L', false, 0, $x, $y += 5);
        $pdf->MultiCell(0, 7, 'Mobile                   :   ' . $Contact->mobile, 0,  'L', false, 0, $x, $y += 5);
        $pdf->MultiCell(0, 7, 'District                   :   ' . $Contact->place, 0,  'L', false, 0, $x, $y += 5);
        $pdf->MultiCell(0, 7, 'Maritial Status       :   ' . $Contact->maritial_status, 0,  'L', false, 0, $x, $y += 5);
        $pdf->MultiCell(0, 7, 'Date Of Joining     :   ' . $Contact->created_at, 0,  'L', false, 0, $x, $y += 5);

        $x = 100;
        $pdf->MultiCell(0, 7, 'Employee Image     ', 0,  'L', false, 0, $x, $sply_y);
        $img_file = storage_path('app/public/contact/' . $Contact->img_file);
        $pdf->Image($img_file, 98, 38, 30, 35, '', '', '', false, 300, '', false, false, 0, false, false, false);


        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('helvetica', 'B', 10.5);
        $pdf->SetFillColor(37, 150, 190);

        $pdf->MultiCell(42.8, 8, 'EMPLOYEE FORM', 0,  'C', true, 0, 100, 5);
        $x = 100;
        $y = 10;
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('helvetica', '', 9);

        $pdf->MultiCell(0, 7, 'Pdf No : ' . $Contact->id, 0,  'L', false, 0, $x, $y += 3);

        $pdf->SetFont('helvetica', '', 12);

        // Function to make labeled rows neatly




        // Output PDF directly for download
        $pdfContent = $pdf->Output("Contact-$id.pdf", 'S');

        return response($pdfContent)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=\"Contact-$id.pdf\"");
    }
}
