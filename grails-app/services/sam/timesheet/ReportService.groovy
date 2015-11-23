package sam.timesheet

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
import com.itextpdf.text.pdf.ColumnText
import com.itextpdf.text.pdf.PdfPCell
import com.itextpdf.text.pdf.PdfPTable
import com.itextpdf.text.pdf.PdfPageEventHelper
import com.itextpdf.text.pdf.PdfTemplate
import com.itextpdf.text.pdf.PdfWriter

import grails.transaction.Transactional

import java.time.LocalTime

@Transactional
class ReportService {

    int TABLE_COLUMNS = 8
    public static final String SAM_IMAGE = "grails-app/assets/images/LogoSamSistemas_transp.gif";

    def headers = ["Fecha","Tarea","Persona","Solicitud","Observacion","Horas"]

    def makeReport(ArrayList<JobLog> listJL, filters)throws IOException, DocumentException {
            // step 1
            Document document = new Document(PageSize.A4,36, 36, 54, 64)
            // step 2
            FileOutputStream file = new FileOutputStream("C:\\tmp\\report.pdf")
            PdfWriter writer = PdfWriter.getInstance(document,file )

            Footer pageFooter = new Footer()

            def dateCreated = new Date()
            LocalTime now = LocalTime.now();
            pageFooter.setFooter("Fecha de impresi�n:"+dateCreated.format("dd-MM-yyyy")+"     Hora:"+now.getHour()+":"+now.getMinute());

            writer.setPageEvent(pageFooter);
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

        Font fontLabel = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLACK);

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
        reportTitleCell.setColspan(7)
        reportTitleCell.setFixedHeight(65f)
        reportTitleCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(reportTitleCell)

        //Filter Report Client Label
        Phrase clientLabel = new Phrase("Cliente: "+filters.client.name,fontLabel);
        PdfPCell clientLabelCell = new PdfPCell(clientLabel)
        clientLabelCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        clientLabelCell.setBorderColor(BaseColor.LIGHT_GRAY)
        clientLabelCell.setColspan(4)
        clientLabelCell.setFixedHeight(20f);
        clientLabelCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(clientLabelCell)

        //Filter Report Project info
        PdfPCell clientInfolCell = new PdfPCell(new Phrase("Proyecto: "+filters.project.name,fontLabel))
        clientInfolCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        clientInfolCell.setBorderColor(BaseColor.LIGHT_GRAY)
        clientInfolCell.setColspan(4)
        clientInfolCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        clientInfolCell.setFixedHeight(20f)
        table.addCell(clientInfolCell)

        //Filter Report Date Information
        def dateFrom = filters.dateFrom.format("dd-MM-yyyy")

        Phrase filterDate = new Phrase("Fecha desde: "+dateFrom,fontLabel);
        PdfPCell filterDateCell = new PdfPCell(filterDate)
        filterDateCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        filterDateCell.setBorderColor(BaseColor.LIGHT_GRAY)
        filterDateCell.setColspan(4)
        filterDateCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(filterDateCell)

        def dateTo = filters.dateTo.format("dd-MM-yyyy")
        Phrase filterDateTo = new Phrase("Fecha Hasta: "+dateTo,fontLabel);
        PdfPCell filterDateToCell = new PdfPCell(filterDateTo)
        filterDateToCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        filterDateToCell.setBorderColor(BaseColor.LIGHT_GRAY)
        filterDateToCell.setColspan(4)
        filterDateToCell.setBackgroundColor(BaseColor.LIGHT_GRAY)
        table.addCell(filterDateToCell)

        Phrase breakHeader = new Phrase("");
        PdfPCell breakHeaderCell = new PdfPCell(breakHeader)
        breakHeaderCell.setFixedHeight(20f);
        breakHeaderCell.setColspan(8)
        breakHeaderCell.setBorderColor(BaseColor.WHITE)
        table.addCell(breakHeaderCell)
    }

    def PdfPTable getData(ArrayList<JobLog> dataTable,filters) throws Exception {

        // a table with "TABLE_COLUMNS" columns
        PdfPTable table = new PdfPTable(TABLE_COLUMNS);
        Float hourCounter = 0
        Font fontObs = new Font(Font.FontFamily.UNDEFINED, 9, Font.NORMAL, BaseColor.BLACK);

        addHeaderTable(table,filters)



        table.getDefaultCell().setBackgroundColor(BaseColor.LIGHT_GRAY);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        for (String title:headers){
            if (title=="Observacion"){
                PdfPCell obsCell = new PdfPCell(new Phrase(title))
                obsCell.setColspan(3)
                obsCell.setHorizontalAlignment(Element.ALIGN_CENTER);
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

                PdfPCell personCell = new PdfPCell(new Phrase(jLog.person.name +" "+jLog.person.lastname,fontObs))
                table.addCell(personCell)
                log.info("CELL PERSON CREATED!")

                PdfPCell solicCell = new PdfPCell(new Phrase(jLog.solicitude))
                table.addCell(solicCell)
                log.info("CELL SOLICITUDE CREATED!")

                PdfPCell obsCell = new PdfPCell(new Phrase(jLog.observation,fontObs))
                obsCell.setColspan(3)
                table.addCell(obsCell)
                log.info("CELL OBSERVATION CREATED!")

                PdfPCell hourCell = new PdfPCell(new Phrase(jLog.hours))
                hourCell.setHorizontalAlignment(Element.ALIGN_CENTER);
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

    public class Footer extends PdfPageEventHelper {

        private String footer;
        PdfTemplate total;
        int[] widths = [24,24,2]

        public void onOpenDocument(PdfWriter writer, Document document) {
            total = writer.getDirectContent().createTemplate(30, 16);
        }

        public void onEndPage(PdfWriter writer, Document document) {
            PdfPTable table = new PdfPTable(3);
            try {
                // Se determina el ancho y altura de la tabla
                table.setWidths(widths);
                table.setTotalWidth(527);
                table.setLockedWidth(true);
                table.getDefaultCell().setFixedHeight(20);

                // Borde de la celda
                table.getDefaultCell().setBorder(Rectangle.TOP);

                table.addCell(footer);
                table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);

                table.addCell(String.format("P�gina %d de", writer.getPageNumber()));

                PdfPCell cell = new PdfPCell(Image.getInstance(total));

                cell.setBorder(Rectangle.TOP);

                table.addCell(cell);
                table.writeSelectedRows(0, -1, 36, 64, writer.getDirectContent());
            }
            catch(DocumentException de) {
                throw new ExceptionConverter(de);
            }
        }

        public void onCloseDocument(PdfWriter writer, Document document) {
            int numOfPages = writer.getPageNumber();
            numOfPages = numOfPages-1;
            ColumnText.showTextAligned(total, Element.ALIGN_LEFT, new Phrase(String.valueOf(numOfPages)), 2, 2, 0);
        }

        // Getter and Setters

        public String getFooter() {
            return footer;
        }
        public void setFooter(String footer) {
            this.footer = footer;
        }
    }


}
