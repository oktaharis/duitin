
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, Filter, Loader2 } from "lucide-react";

interface ExportOptionsProps {
  onExportCSV: () => void;
  onExportJSON: () => void;
  onExportPDF: () => void;
  isExporting: boolean;
  hasData: boolean;
}

export const ExportOptions = ({
  onExportCSV,
  onExportJSON,
  onExportPDF,
  isExporting,
  hasData,
}: ExportOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">CSV Export</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Format spreadsheet yang kompatibel dengan Excel, Google Sheets, dan aplikasi lainnya. 
            Ideal untuk analisis data lebih lanjut.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Ringan</Badge>
            <Badge variant="secondary">Universal</Badge>
            <Badge variant="secondary">Excel Compatible</Badge>
          </div>
          <Button 
            onClick={onExportCSV} 
            className="w-full"
            disabled={isExporting || !hasData}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Mengekspor...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </>
            )}
          </Button>
          {!hasData && (
            <p className="text-xs text-amber-600">Tidak ada data untuk diekspor</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">JSON Export</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Format data mentah untuk developer atau backup lengkap dengan metadata. 
            Cocok untuk integrasi sistem.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Lengkap</Badge>
            <Badge variant="secondary">Backup</Badge>
            <Badge variant="secondary">Developer</Badge>
          </div>
          <Button 
            onClick={onExportJSON} 
            className="w-full"
            disabled={isExporting || !hasData}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Mengekspor...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </>
            )}
          </Button>
          {!hasData && (
            <p className="text-xs text-amber-600">Tidak ada data untuk diekspor</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-red-600" />
            <CardTitle className="text-lg">PDF Report</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Laporan terformat dengan tabel dan total untuk presentasi atau arsip. 
            Siap untuk dicetak atau dibagikan.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Formal</Badge>
            <Badge variant="secondary">Tabel</Badge>
            <Badge variant="secondary">Print Ready</Badge>
          </div>
          <Button 
            onClick={onExportPDF} 
            className="w-full"
            disabled={isExporting || !hasData}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Mengekspor...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
          {!hasData && (
            <p className="text-xs text-amber-600">Tidak ada data untuk diekspor</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
