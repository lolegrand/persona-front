export class Persona {
    constructor(firstname, lastname, email, street, city, state, country, latitude, longitude, dateOfBirth, phone, mobile, thumbnail, id) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.street = street
        this.city = city
        this.state = state
        this.country = country
        this.latitude = latitude
        this.longitude = longitude
        this.phone = phone
        this.mobile = mobile
        this.thumbnail = thumbnail
        this.id = id
        this.dateOfBirth = dateOfBirth
    }

    get dob() {
        let d = new Date(this.dateOfBirth)
        return d.toUTCString()
    }

    static toPersona(rawPersona) {
        let element = rawPersona.results[0]
        return new Persona(
            element.name.first,
            element.name.last,
            element.email,
            `${element.location.street.number} ${element.location.street.name}`,
            element.location.city,
            element.location.state,
            element.location.country,
            element.location.coordinates.latitude,
            element.location.coordinates.longitude,
            Math.trunc(Date.parse(element.dob.date)/ 1000),
            element.phone,
            element.cell,
            element.picture.large,
            null
        )
    }

}
