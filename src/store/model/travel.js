// 公司
export function Company() {
  this.name = '偉康科技 Webcomm Technology'
  this.taxId = '16590299'
  this.taxTitle = '偉康科技股份有限公司 '
  this.phone = '02 7701 5899'
  this.address = '105台北市松山區南京東路五段89號9樓'
  this.travelLimit = 10000 // 旅遊補助上限
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

// FIXME:引用ts後 可改用enum
export const TravelCostType = {
  Itinerary: 'itinerary', // 行程
  TogetherBuy: 'togetherBuy', // 團購
  Private: 'private', // 個人
}
export const TravelCostCountType = {
  Total: 'total', // 總額
  PerPerson: 'perPerson', // 每人多少(均分)
  ByCase: 'byCase', // 個案(如雙人房 四人房 不同價格)
  Private: 'Private', // 個人
}

export function TravelCost(type = TravelCostType.Itinerary, countType = TravelCostCountType.Total, cost = 0, isTax = false) {
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
//   this.travelers = [...new traveler()]
// }
export function TravelItem(name, type, desc, travelCost, startDate, endDate) {
  this.name = name
  this.type = type
  this.desc = desc
  this.travelCost = travelCost
  this.startDate = startDate
  this.endDate = endDate
}

export const TravelStatus = {
  Opened: 'opened', // 可報名
  Ing: 'ing', // 旅程進行中
  End: 'end', // 已結束
  Joined: 'joined', // 已報名
}

export function Travel() {
  this.id = ''
  this.status = TravelStatus.Ing // open,ing,end,joined 開團招募中 進行中 已結束 已報名
  this.info = new TravelInfo()
  this.travelType = new TravelType()// 旅遊型態 員工旅遊
  this.travelItems = []// TravelItem()
}

// Firestore data converter
export const travelConverter = {
  toFirestore: travel => ({
    id: travel.id,
    status: travel.status,
    info: { ...travel.info },
    travelType: {
      type: travel.travelType.type, //  員工旅遊
      // FIXME: 公司先寫死
      company: {
        name: '偉康科技 Webcomm Technology',
        taxId: '16590299',
        taxTitle: '偉康科技股份有限公司 ',
        phone: '02 7701 5899',
        address: '105台北市松山區南京東路五段89號9樓',
        travelLimit: 10000, // 旅遊補助上限
      },
    },
    travelItems: travel.travelItems.map(item => ({
      name: item.name,
      type: item.type,
      desc: item.desc,
      travelCost: {
        type: item.travelCost.type, // itinerary, togetherBuy, private 行程, 團購, 個人
        countType: item.travelCost.countType, // total,perPerson,byCase,private  計算方式 總額 或 每人多少 或 個案(如雙人房 四人房 不同價格) 或私人項目
        cost: item.travelCost.cost,
        isTax: item.travelCost.isTax,
      },
      startDate: item.startDate,
      endDate: item.endDate,
    })),
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    const travel = new Travel()
    travel.id = snapshot.id
    travel.status = data.status

    // TravelInfo
    const travelInfo = new TravelInfo()
    travelInfo.title = data.info.title
    travelInfo.subTitle = data.info.subTitle
    travelInfo.desc = data.info.desc
    travelInfo.startDate = data.info.startDate
    travelInfo.endDate = data.info.endDate
    travelInfo.type = data.info.type
    travel.info = travelInfo

    // TravelType
    const travelType = new TravelType()
    travelType.type = data.travelType.type
    travelType.company = new Company()
    travel.travelType = travelType

    // travelItems
    travel.travelItems = Object.keys(data.travelItems).map(key => {
      const item = data.travelItems[key]
      const travelCost = new TravelCost()
      travelCost.type = item.type // itinerary, togetherBuy, private 行程, 團購, 個人
      travelCost.countType = item.countType// total,perPerson,byCase,private  計算方式 總額 或 每人多少 或 個案(如雙人房 四人房 不同價格) 或私人項目
      travelCost.cost = item.cost
      travelCost.isTax = item.isTax // 可否打統編

      return new TravelItem(item.name, item.type, item.desc, travelCost, item.startDate, item.endDate)
    })

    // travel.travelItems = data.travelItems.map(item => {
    //   const travelCost = new TravelCost()
    //   travelCost.type = item.type // itinerary, togetherBuy, private 行程, 團購, 個人
    //   travelCost.countType = item.countType// total,perPerson,byCase,private  計算方式 總額 或 每人多少 或 個案(如雙人房 四人房 不同價格) 或私人項目
    //   travelCost.cost = item.cost
    //   travelCost.isTax = item.isTax // 可否打統編

    //   return new TravelItem(item.name, item.type, item.desc, travelCost, item.startDate, item.endDate)
    // })

    return travel
  },
}
