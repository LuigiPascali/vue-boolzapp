// Inizializzazione Vue Js:
const app = Vue.createApp({
  data() {
      return {

      // MILESTONE 2:
      currentlyActiveIndex: 0,

      // MILESTONE 4:
      searchQuery:'',

      // MILESTONE 1:

      contacts: [
        {
          name: 'Michele',
          avatar: 'img/avatar_1.jpg',
          visible: true,
          messages: [
                  {
                  date: '10/01/2020 15:30:55',
                  message: 'Hai portato a spasso il cane?',
                  status: 'sent',
                  showDropdown: false 
                  },
                  {
                  date: '10/01/2020 15:50:00',
                  message: 'Ricordati di stendere i panni',
                  status: 'sent',
                  showDropdown: false 
                  },
                  {
                  date: '10/01/2020 16:15:22',
                  message: 'Tutto fatto!',
                  status: 'received',                  
                  }
          ],
        },
        {
          name: 'Fabio',
          avatar: 'img/avatar_2.jpg',
          visible: true,
          messages: [
                  { 
                  date: '20/03/2020 16:30:00',
                  message: 'Ciao come stai?',
                  status: 'sent'
                  },
                  {
                  date: '20/03/2020 16:30:55',
                  message: 'Bene grazie! Stasera ci vediamo?',
                  status: 'received'
                  },
                  {
                  date: '20/03/2020 16:35:00',
                  message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                  status: 'sent'
                  }
          ],
        },
        {
          name: 'Samuele',
          avatar: 'img/avatar_3.jpg',
          visible: true,
          messages: [
            {
            date: '28/03/2020 10:10:40',
            message: 'La Marianna va in campagna',
            status: 'received'
            },
            {
            date: '28/03/2020 10:20:10',
            message: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
            },
            {
            date: '28/03/2020 16:15:22',
            message: 'Ah scusa!',
            status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro B.',
          avatar: 'img/avatar_4.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro L.',
          avatar: 'img/avatar_5.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ricordati di chiamare la nonna',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Va bene, stasera la sento',
            status: 'received'
            }
          ],
        },
        {
          name: 'Claudia',
          avatar: 'img/avatar_6.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao Claudia, hai novità?',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Non ancora',
            status: 'received'
            },
            {
            date: '10/01/2020 15:51:00',
            message: 'Nessuna nuova, buona nuova',
            status: 'sent'
            }
          ],
        },
        {
          name: 'Federico',
          avatar: 'img/avatar_7.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Fai gli auguri a Martina che è il suo compleanno!',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Grazie per avermelo ricordato, le scrivo subito!',
            status: 'received'
            }
          ],
        },
        {
          name: 'Davide',
          avatar: 'img/avatar_8.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao, andiamo a mangiare la pizza stasera?',
            status: 'received'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:51:00',
            message: 'OK!!',
            status: 'received'
            }
          ],
        }
      ],
      newMessage: '',
      };
    },
    
    // MILESTONE 2:
    methods: {
      changeChat(currentlyActiveIndex) {
        this.contacts[this.currentlyActiveIndex].isActive = false;
        this.currentlyActiveIndex = currentlyActiveIndex;
        this.contacts[this.currentlyActiveIndex].isActive = true;
      },

      // MILESTONE 3:
      sendMessage() {
        if (this.newMessage.trim() === '') {
          return;
        }
        
        const currentDate = luxon.DateTime.local().toFormat('dd/MM/yyyy HH:mm:ss');
        this.contacts[this.currentlyActiveIndex].messages.push({
          date: currentDate,
          message: this.newMessage,
          status: 'sent'
        });

        // Simulazione di una risposta dopo 1 secondo
        setTimeout(() => {
          this.contacts[this.currentlyActiveIndex].messages.push({
            date: currentDate,
            message: 'Ok',
            status: 'received'
          });
          
        }, 1000);

        this.newMessage = '';
      },

      // MILESTONE 5: 
      toggleDropdown(messageData) {
        messageData.showDropdown = !messageData.showDropdown;
      },

      deleteMessage(messageData) {
        const index = this.contacts[this.currentlyActiveIndex].messages.indexOf(messageData);

        if (index > -1) {
          this.contacts[this.currentlyActiveIndex].messages.splice(index, 1);
        }
      },

      getLastMessage(contact) {
        const lastMessage = contact.messages[contact.messages.lenght - 1];

        return lastMessage ? lastMessage.message : '';
      },

      getLastMessageTime(contact) {
        const lastMessage = contact.messages[contact.messages.lenght - 1];

        return lastMessage ? lastMessage.date : '';
      },

    },
    // MILESTONE 4:
    computed: {
      filteredContacts() {
        return this.contacts.filter(contact => {
          return contact.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }
});
// Mostra l'applicazione nella pagina HTML
app.mount('#app');



