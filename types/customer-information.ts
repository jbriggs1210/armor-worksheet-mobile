export type FullCustomerInformation = {
    id?: number,
    name?: string,
    streetNumber?: string,
    streetName?: string,
    lotNumber?: string,
    cityTown?: string,
    state?: string,
    zipCode?: string,
    plantation?: string,
    mobile1?: string,
    mobile2?: string,
    home?: string,
    builderSuperName?: string,
    builderSuperMobile?: string,
    jobDataId?: number,
}

export class FullCustomerInformationBase implements FullCustomerInformation {
    id?: number;
    name?: string;
    streetNumber?: string;
    streetName?: string;
    lotNumber?: string;
    cityTown?: string;
    state?: string;
    zipCode?: string;
    plantation?: string;
    mobile1?: string;
    mobile2?: string;
    home?: string;
    builderSuperName?: string;
    builderSuperMobile?: string;
    jobDataId?: number;

    constructor();
    constructor(id?: number, name?: string, streetNumber?: string, streetName?: string, lotNumber?: string,
                cityTown?: string, state?: string, zipCode?: string, plantation?: string, mobile1?: string,
                mobile2?: string, home?: string, builderSuperName?: string, builderSuperMobile?: string,
                jobDataId?: number) {
        this.id = id;
        this.name = name;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.lotNumber = lotNumber;
        this.cityTown = cityTown;
        this.state = state;
        this.zipCode = zipCode;
        this.plantation = plantation;
        this.mobile1 = mobile1;
        this.mobile2 = mobile2;
        this.home = home;
        this.builderSuperName = builderSuperName;
        this.builderSuperMobile = builderSuperMobile;
        this.jobDataId = jobDataId;
    }
}