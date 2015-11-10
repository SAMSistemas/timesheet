package sam.timesheet.domain

import com.itextpdf.text.BaseColor
import com.itextpdf.text.Document
import com.itextpdf.text.DocumentException
import com.itextpdf.text.Element
import com.itextpdf.text.ExceptionConverter
import com.itextpdf.text.Font
import com.itextpdf.text.Image
import com.itextpdf.text.PageSize
import com.itextpdf.text.Phrase
import com.itextpdf.text.Rectangle
import com.itextpdf.text.pdf.PdfPCell
import com.itextpdf.text.pdf.PdfPTable
import com.itextpdf.text.pdf.PdfPTableHeader
import com.itextpdf.text.pdf.PdfWriter

import grails.transaction.Transactional

import java.text.ParseException
import java.text.SimpleDateFormat

@Transactional
class ReportService {

    int TABLE_COLUMNS = 8
    public static final String SAM_IMAGE = "grails-app/assets/images/LogoSamSistemas_transp.gif";

    def headers = ["Fecha","Tarea","Persona","Solicitud","Observacion","Horas"]

    def makeReport(ArrayList<JobLog> listJL, filters)throws IOException, DocumentException {
            // step 1
            Document document = new Document(PageSize.A4.rotate(),2,2,10,2)
            // step 2
            FileOutputStream file = new FileOutputStream("C:\\tmp\\report.pdf")
            PdfWriter.getInstance(document,file )
            // step 3
            document.open();
            // step 4
            document.add(getData(listJL,filters));
            // step 5
            document.close();

        return file
    }

    def addHeaderTable(PdfPTable table, filters)
            throws DocumentException {

        table.setWidthPercentage(100);

        //ADD SAM IMAGE
        Image imgSAM = Image.getInstance(SAM_IMAGE)
        imgSAM.scaleAbsoluteHeight(72f)
        PdfPCell imgSAMCell = new PdfPCell()
        imgSAMCell.setImage(imgSAM)
        imgSAMCell.setBorderColor(BaseColor.LIGHT_GRAY)
        imgSAMCell.setColspan(4)
        imgSAMCell.setFixedHeight(65f);
        imgSAMCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(imgSAM)

        //ADD TITLE OF REPORT
        Font font = new Font(Font.FontFamily.HELVETICA, 15, Font.BOLD, BaseColor.BLACK);
        Phrase reportTitle = new Phrase("REPORTE DE HORAS POR PROYECTO", font);
        PdfPCell reportTitleCell = new PdfPCell(reportTitle)
        reportTitleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        reportTitleCell.setBorderColor(BaseColor.LIGHT_GRAY)
        reportTitleCell.setColspan(4)
        reportTitleCell.setFixedHeight(65f);
        reportTitleCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(reportTitleCell)

        //ADD DATE of Creation
        def dateCreated = new Date()
        Phrase datePhrase = new Phrase("Fecha:"+dateCreated.format("dd-MM-yyyy"))
        PdfPCell dateCreatedCell = new PdfPCell(datePhrase)
        dateCreatedCell.setColspan(3)
        dateCreatedCell.setFixedHeight(65f);
        dateCreatedCell.setBorderColor(BaseColor.LIGHT_GRAY)
        dateCreatedCell.setHorizontalAlignment(Element.ALIGN_RIGHT)
        dateCreatedCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(dateCreatedCell)


        //Filter Report Client Label
        Phrase clientLabel = new Phrase("Cliente: ",font);
        PdfPCell clientLabelCell = new PdfPCell(clientLabel)
        clientLabelCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        clientLabelCell.setBorderColor(BaseColor.LIGHT_GRAY)
        clientLabelCell.setColspan(1)
        clientLabelCell.setFixedHeight(20f);
        clientLabelCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(clientLabelCell)

        //Filter Report Client info
        PdfPCell clientInfolCell = new PdfPCell(new Phrase(""+filters.client.name))
        clientInfolCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        clientInfolCell.setBorderColor(BaseColor.LIGHT_GRAY)
        clientInfolCell.setColspan(10)
        clientInfolCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        clientInfolCell.setFixedHeight(20f)
        table.addCell(clientInfolCell)



        //Filter Report Date Information
        def dateFrom = filters.dateFrom.format("dd-MM-yyyy")
        def dateTo = filters.dateTo.format("dd-MM-yyyy")
        Phrase filterDate = new Phrase("Fecha desde: "+dateFrom+"        Hasta: "+dateTo);
        PdfPCell filterDateCell = new PdfPCell(filterDate)
        filterDateCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        filterDateCell.setBorderColor(BaseColor.LIGHT_GRAY)
        filterDateCell.setColspan(8)
        filterDateCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(filterDateCell)


        Phrase breakHeader = new Phrase("");
        PdfPCell breakHeaderCell = new PdfPCell(breakHeader)
        breakHeaderCell.setFixedHeight(50f);
        breakHeaderCell.setColspan(8)
        breakHeaderCell.setBorderColor(BaseColor.WHITE)
        table.addCell(breakHeaderCell)
    }

    def PdfPTable getData(ArrayList<JobLog> dataTable,filters) throws Exception {

        // a table with "TABLE_COLUMNS" columns
        PdfPTable table = new PdfPTable(TABLE_COLUMNS);
        Float hourCounter = 0

        addHeaderTable(table,filters)



        table.getDefaultCell().setBackgroundColor(BaseColor.LIGHT_GRAY);
        for (String title:headers){
            if (title=="Observacion"){
                PdfPCell obsCell = new PdfPCell(new Phrase(title))
                obsCell.setColspan(3)
                obsCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
                table.addCell(obsCell);
            }else{
                table.addCell(title);
            }
        }

        table.getDefaultCell().setBackgroundColor(null);



        log.info("LISTA DE DATOS------------>"+dataTable.size())

        for(JobLog jLog: dataTable){

            log.info("ROW CREATED!")


            PdfPCell dateCell = new PdfPCell(new Phrase(jLog.date.format("dd-MM-yyyy")))
            table.addCell(dateCell)
            log.info("CELL DATE CREATED!")

            PdfPCell taskCell = new PdfPCell(new Phrase(jLog.task_type.name))
            table.addCell(taskCell)
            log.info("CELL TASK CREATED!")

            PdfPCell personCell = new PdfPCell(new Phrase(jLog.person.name +" "+jLog.person.lastname))
            table.addCell(personCell)
            log.info("CELL PERSON CREATED!")

            PdfPCell solicCell = new PdfPCell(new Phrase(jLog.solicitude))
            table.addCell(solicCell)
            log.info("CELL SOLICITUDE CREATED!")

            PdfPCell obsCell = new PdfPCell(new Phrase(jLog.observation))
            obsCell.setColspan(3)
            table.addCell(obsCell)
            log.info("CELL OBSERVATION CREATED!")

            PdfPCell hourCell = new PdfPCell(new Phrase(jLog.hours))
            table.addCell(hourCell)
            log.info("CELL HOURS CREATED!")

            hourCounter = hourCounter + Float.valueOf(jLog.hours)
        }


        //HOUR TOTAL
        table.getDefaultCell().setBackgroundColor(BaseColor.LIGHT_GRAY);
        PdfPCell hourCountercell = new PdfPCell(new Phrase("Total de horas: "+hourCounter.toString()));
        hourCountercell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        hourCountercell.setColspan(TABLE_COLUMNS);
        table.addCell(hourCountercell);


        return table
    }


    def formatDate(dateInString) {

        def formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault())

        try {

            def date = formatter.parse(dateInString)
            return  date

        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

}
