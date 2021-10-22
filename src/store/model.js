export function Example() {
  this.name = 'wyn'
}

// 參加該項目的旅遊者
export function Traveler() {
  this.uuid = 'wyn'
  this.displayName = ''
  this.email = ''
  this.travelOwner = []
}

export function TravelInfo() {
  this.title = ''
  this.subTitle = ''
  this.desc = ''
  this.startDate = ''
  this.endDate = ''
  this.type = ''
}

export function TravelType() {
  this.type = 'empTravel' //  員工旅遊
  this.taxId = '77030333'
  this.taxTitle = '偉康科技股份有限公司職工福利委員會'
  this.limit = 10000 // 旅遊補助上限
}

// export function TravelItem() {
//   this.name = '六福村'
//   this.type = '遊樂園'
//   this.desc = '開心玩'
//   this.start_date = ''
//   this.end_date = ''
//   this.travelers = [...new Traveler()]
// }
export function TravelItem(name, type, desc, startDate, endDate, travelers) {
  this.name = name
  this.type = type
  this.desc = desc
  this.startDate = startDate
  this.endDate = endDate
  this.travelers = travelers
}

export function Travel() {
  this.id = ''
  this.status = 'ing' // prepare,ing,end
  this.info = new TravelInfo()
  this.travelType = new TravelType()// 旅遊型態 員工旅遊
  this.travelItems = []// TravelItem()
}
