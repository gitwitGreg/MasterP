export interface TMEvent {
    name: string,
    type: string,
    id: string,
    test: boolean,
    url: string,
    products: {
        id: string,
        name: string,
        type: string,
        url: string
    }[],
    local: string,
    generalInfo: {
        childRule: string,
        generalRule: string
    }
    promoter: {
        description: string,
        id: string,
        name: string
    },
    seatmap: {
        id: string,
        staticUrl: string
    },
    _embedded: {
        attractions: {
            name: string,
            type: string,
            id: string,
            test: boolean
        }[],
        venues: {
            name: string,
            type: string,
            id: string,
            test: boolean,
            address: {
                line1: string
            },
            city: {
                name: string,
                parkingDetails: string,
                postalCode: string,
                state: {
                    name: string,
                    stateCode: string
                },
                timezone: string
            }
        }[]
    }
    images: {
      ratio: string,
      url: string,
      width: number,
      height: number, 
      fallback: boolean
    }[],
    unites: string,
    sales: {
        public: {
            startDateTime: string,
            startTBD: boolean,
            endDateTime: string,
        }
    },
    dates: {
        start: {
            localDate: string,
            dateTBD: boolean,
            dateTBA: boolean,
            timeTBA: boolean,
            noSpecificTime: boolean,
            localTime: string,
        },
        timezone: string,
        status: {
            code: string
        }
    },
    classifications: {
        primary: boolean,
        segment: {
            id: string,
            name: string,
        },
        genre: {
            id: string,
            name: string,
        },
        subGenre: {
            id: string,
            name: string
        }
    },
    info: string,
    pleaseNote: string,
    priceRanges: {
        type: string,
        currency: string,
        min: number,
        max: number
    }[],
    
}

export interface FavoritedEvent {
    eventId: string
    name: string,
    date: string,
    venue: string,
    promoter: string,
    address: string,
}

export interface Coordinates {
    lat: number,
    lng: number,
}

export interface FavoritedInfo {
    favorites : FavoritedEvent[] | undefined,
    isFavorited: boolean | undefined,
}

export interface queryObj {
    params : {}, 
    searchParams: {
        eventId: string,
        venueId: string,
        amount: number
    },
}

export interface Suggested {

    page: {
        size: number
        totalElements: number,
        totalPages: number,
    },

    _embedded: {

        attractions: {

            classifications: {
                family: false,
                genre: string
                primary: string
                segment: {id: string, name: string},
                subGenere: {id: string, name: string},
                subType: {id: string, name: string},
                type: {id: string, name: string}

            },

            externalLink: {
                facebook: {url: string}[],
                youtube: {url: string}[],
            },

            images: {
                fallback: false,
                height: number,
                ratio: string,
                url: string,
                width: number
            }[]

            local: string,
            name: string,
            type: string,
            url: string,
            id: string,

        }[]

        venues: {
            accesibleSeatingDetails: string,
            adress: {line1: string}
            boxOfficeInfo: {phoneNumberDetails: string}
            city: {name: string}
            country: {name: string}
            generalInfo: {generalRule: string, id: string}
            id: string,
            name: string,
            postalCode: string,
            state: {name: string, stateCode: string}
            timezone: string
        }[]

        events: TMEvent[]

    }
}

export interface calanderEvent {
    title: string,
    start: string,
    end: string,
    id: string,
}
