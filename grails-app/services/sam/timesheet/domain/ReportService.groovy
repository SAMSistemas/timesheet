package sam.timesheet.domain

import com.itextpdf.text.Document
import com.itextpdf.text.DocumentException
import com.itextpdf.text.Phrase
import com.itextpdf.text.pdf.PdfPCell
import com.itextpdf.text.pdf.PdfPTable
import com.itextpdf.text.pdf.PdfWriter

import grails.transaction.Transactional

@Transactional
class ReportService {

    int TABLE_COLUMNS = 6

    def makeReport(ArrayList<JobLog> listJL)throws IOException, DocumentException {


            // step 1
            Document document = new Document();
            // step 2
            PdfWriter.getInstance(document, new FileOutputStream("test.pdf"));
            // step 3
            document.open();
            // step 4
            document.add(getData(listJL));
            // step 5
            document.close();

        return document
    }


    def PdfPTable getData(ArrayList<JobLog> dataTable) throws Exception {

        // a table with "TABLE_COLUMNS" columns
        PdfPTable table = new PdfPTable(TABLE_COLUMNS);

        log.info("LISTA DE DATOS------------>"+dataTable.size())

        for(JobLog jLog: dataTable){

            log.info("ROW CREATED!")


            PdfPCell dateCell = new PdfPCell(new Phrase(jLog.date.dateString))
            table.add(dateCell)

            PdfPCell taskCell = new PdfPCell(new Phrase(jLog.task_type.name))
            table.add(taskCell)

            PdfPCell personCell = new PdfPCell(new Phrase(jLog.person.name +" "+jLog.person.lastname))
            table.add(personCell)

            PdfPCell solicCell = new PdfPCell(new Phrase(jLog.solicitude))
            table.add(solicCell)

            PdfPCell obsCell = new PdfPCell(new Phrase(jLog.observation))
            table.add(obsCell)
        }

        return table
    }

}
