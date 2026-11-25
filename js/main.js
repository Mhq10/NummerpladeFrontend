const app = Vue.createApp({
    data() {
        return {
            Role: '',

            parkings: [],

            searchId: '',
            searchLicensePlate: '',
            searchMake: '',
            searchModel: '',
            searchVariant: '',
            searchColor: '',
            searchChassisType: '',

            AddedNumberPlate: null,
            AddedId: null,
            AddedTitle: null,
            AddedArtist: null,
            AddedGenre: null,
            AddedYear: null,
            AddedDuration: null,

            baseUrl: 'https://localhost:5001'
        }
    },

    methods: {
        getAllParkings() {
            axios.get(`${this.baseUrl}/api/parkings`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ParkingToken')}`
                },
                params: {
                    Id: this.searchId,
                    LicensePlate: this.searchLicensePlate,
                    Make: this.searchMake,
                    Model: this.searchModel,
                    Variant: this.searchVariant,
                    Color: this.searchColor,
                    ChassisType: this.searchChassisType
                } 
            })
                .then(response => {
                    this.parkings = response.data;
                })
                .catch(error => {
                    console.error('Error fetching parkings:', error);
                });
        },
        
    

            axios.post(`${this.baseUrl}/api/parkings`, newRecord, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ParkingToken')}`
                }
            })
                .then(response => {
                    console.log('Parking added:', response.data);
                    this.getAllParkings(); // Refresh the parkings list after adding
                })
                .catch(error => {
                    console.error('Error adding parking:', error);
                });
        },

        updateR() {
                const newRecord = {
                    id: this.AddedId,
                    title: this.AddedTitle,
                    artist: this.AddedArtist,
                    genre: this.AddedGenre,
                    year: this.AddedYear,
                    duration: this.AddedDuration
                };

                axios.put(`${this.baseUrl}/api/records`, newRecord, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('MusicToken')}`
                    }   
                })
                .then(response => {
                    console.log('Record updated:', response.data);
                    this.getAllRecords(); // Refresh the records list after adding
                })
                .catch(error => {
                    console.error('Error adding record:', error);
                });
        },

        deleteParking() {
            axios.delete(`${this.baseUrl}/api/parkings/${this.AddedId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ParkingToken')}`
                }
            }).then(response => {
                console.log('Parking deleted:', response.data);
                this.getAllParkings(); // Refresh the parkings list after deletion
            })
            .catch(error => {
                console.error('Error deleting parking:', error);
            });
        },

        handleLogin(role) {
            this.Role = role;
        },

        logout() {
            localStorage.removeItem('ParkingToken');
            this.Role = '';
        }
    }
})