export interface Mappable {
  location: {
    lat: number
    lng: number
  }
  infoContent(): string
}

export default class {
  private bMap: BMapGL.Map

  constructor(eleId: string) {
    this.bMap = new BMapGL.Map(document.getElementById(eleId))
    const point = new BMapGL.Point(0, 0)
    this.bMap.centerAndZoom(point, 1)
  }

  addMarker(mappable: Mappable) {
    // 添加标记
    const point = new BMapGL.Point(mappable.location.lng, mappable.location.lat)
    const marker = new BMapGL.Marker(point)
    this.bMap.addOverlay(marker)

    // 添加弹窗信息
    const infoWindow = new BMapGL.InfoWindow(mappable.infoContent())
    marker.addEventListener('click', () => {
      this.bMap.openInfoWindow(infoWindow, point)
    })
  }
}