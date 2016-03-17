package sam.timesheet

import javax.xml.bind.DatatypeConverter

class Person {

    String name
    String lastname
    String username
    String password
    Integer work_hours
    Byte[] picture
    Boolean enabled

    static belongsTo = [work_position: WorkPosition]

    static hasMany = [job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false, maxSize: 30
        lastname blank: false, nullable: false, maxSize: 30
        username blank: false, nullable: false, unique: true, maxSize: 25
        password blank: false, nullable: false
        work_hours nullable: false, range: 4.step(10,2,{})
        picture nullable: true
        enabled nullable: false
    }

    String toString(){
        return username
    }

    def beforeInsert(){
        encodePassword()
    }

    def beforeUpdate(){
        encodePassword()
    }

    def afterLoad(){
        decodePassword()
    }

    protected void encodePassword(){
        password = DatatypeConverter.printBase64Binary(password.getBytes());
//        System.out.println("encoded value is \t" + password);
    }

    protected void decodePassword(){
        if(password.length()>8) {
            password = new String(DatatypeConverter.parseBase64Binary(password));
//            System.out.println("decoded value is \t" + password);
        }
    }
}
