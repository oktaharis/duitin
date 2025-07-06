
export const LoadingState = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Export Data Pengeluaran</h1>
        <p className="text-muted-foreground">
          Ekspor data pengeluaran Anda dalam berbagai format
        </p>
      </div>
      
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-muted-foreground">Memuat data...</span>
      </div>
    </div>
  );
};
