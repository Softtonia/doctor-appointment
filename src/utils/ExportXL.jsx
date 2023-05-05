import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export const handleExport = (props,filename) => {
    const sheet = XLSX.utils.json_to_sheet(props);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, 'Data');
    XLSX.writeFile(book, filename);
  }

  function convertJsonToCsv(data) {

  
    const headers = Object.keys(data[0]);
   
    const rows = data.map((row) => {
      return headers.map((header) => {
        return row[header];
      });
    });
  
    const csvArray = [headers, ...rows];
    const csvContent = csvArray.map((row) => row.join(',')).join('\n');

    return csvContent;
  }

  

  export const handleExportCsv = (data, filename) => {
    // const csvData = data.map((row) => {
    //     // Modify this if needed to convert data to CSV format
    //     return Object.values(row).join(',');
    //   }).join('\n');

    const csvData = convertJsonToCsv(data);
    
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, filename);
  }
