export function Example() {
  this.name = 'wyn'
}

// 公司
export function Company() {
  this.name = '偉康科技 Webcomm Technology'
  this.taxId = '16590299'
  this.taxTitle = '偉康科技股份有限公司 '
  this.phone = '02 7701 5899'
  this.address = '105台北市松山區南京東路五段89號9樓'
  this.travelLimit = 10000 // 旅遊補助上限
}

// 參加該項目的旅遊者
export function Traveler() {
  this.uuid = 'wyn'
  this.displayName = ''
  this.email = ''
  this.travelOwner = []
  this.company = new Company()
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
  this.company = new Company()
}

// export function TravelCost() {
//   this.type = 'itinerary' // itinerary, togetherBuy, private 行程, 團購, 個人
//   this.countType = 'total' // total,perPerson,private  計算方式 總額 或 每人多少 或私人項目
//   this.cost = '25000'
//   this.isTax = true // 可否打統編
// }
export function TravelCost(type, countType, cost, isTax) {
  this.type = type // itinerary, togetherBuy, private 行程, 團購, 個人
  this.countType = countType// total,perPerson,byCase,private  計算方式 總額 或 每人多少 或 個案(如雙人房 四人房 不同價格) 或私人項目
  this.cost = cost
  this.isTax = isTax // 可否打統編
}

// export function TravelItem() {
//   this.name = '六福村'
//   this.type = '遊樂園'
//   this.desc = '開心玩'
//   this.start_date = ''
//   this.end_date = ''
//   this.travelers = [...new Traveler()]
// }
export function TravelItem(name, type, desc, travelCost, startDate, endDate, travelers) {
  this.name = name
  this.type = type
  this.desc = desc
  this.travelCost = travelCost
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
