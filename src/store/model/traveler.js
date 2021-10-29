// 公司
export function Company() {
  this.name = '偉康科技 Webcomm Technology'
  this.taxId = '16590299'
  this.taxTitle = '偉康科技股份有限公司 '
  this.phone = '02 7701 5899'
  this.address = '105台北市松山區南京東路五段89號9樓'
  this.travelLimit = 10000 // 旅遊補助上限
}

// 旅遊者 參加的旅遊項目
export function JoinedItem() {
  this.itemId = ''
  this.name = ''
  this.enrollment = 1 // 報名人數
  this.note = ''// 備註
}

// 旅遊者 參加的某一旅遊
export function JoinedTravel() {
  this.travelId = ''
  this.travelStatus = ''
  this.joinedItems = []
}

// 參加該項目的旅遊者
export function Traveler() {
  this.id = 'wyn'
  this.name = ''
  this.email = ''
  this.travelOwner = []
  this.company = new Company()
  this.joinedTravels = []
}

// Firestore data converter
export const travelerConverter = {
  toFirestore: traveler => ({
    id: traveler.id,
    name: traveler.name,
    email: traveler.email,
    travelOwner: traveler.travelOwner,

    // FIXME: 公司先寫死
    // company: traveler.company,
    company: {
      name: '偉康科技 Webcomm Technology',
      taxId: '16590299',
      taxTitle: '偉康科技股份有限公司 ',
      phone: '02 7701 5899',
      address: '105台北市松山區南京東路五段89號9樓',
      travelLimit: 10000, // 旅遊補助上限
    },
    joinedTravels: traveler.joinedTravels.map(travel => ({
      travelId: travel.travelId,
      travelStatus: travel.travelStatus,
      joinedItems: travel.joinedItems.map(item => ({
        itemId: item.itemId,
        name: item.name,
        enrollment: item.enrollment, // 報名人數
        note: item.note, // 備註
      })),
    })),
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    const traveler = new Traveler()
    traveler.id = data.id
    traveler.name = data.name
    traveler.email = data.email
    traveler.travelOwner = data.travelOwner

    // FIXME: 公司先寫死
    // traveler.company = data.company
    traveler.company = new Company()

    traveler.joinedTravels = data.joinedTravels.map(travel => {
      const joinedTravel = new JoinedTravel()
      joinedTravel.travelId = travel.travelId
      joinedTravel.travelStatus = travel.travelStatus
      joinedTravel.joinedItems = travel.joinedItems.map(item => {
        const joinedItem = new JoinedItem()
        joinedItem.itemId = item.itemId
        joinedItem.name = item.name
        joinedItem.enrollment = item.enrollment // 報名人數
        joinedItem.note = item.note// 備註

        return joinedItem
      })

      return joinedTravel
    })

    return traveler
  },
}
