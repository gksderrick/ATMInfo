// https://apis.map.kakao.com/web/documentation/#Library

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.5607318, 126.9678439), //필수!! 지도의 중심좌표.
  level: 4 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


// 컨트롤 추가
var control = new kakao.maps.ZoomControl();
map.addControl(control, kakao.maps.ControlPosition.TOPRIGHT); 

export {map};

class searchedPlace{
  constructor(location, marker=null, infoWindow=null){
    this.location = location;
    this.marker = marker;
    this.infoWindow = infoWindow;
  }
  createMarker(y, x){
    this.marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(Number(y), Number(x))
    });
    return this.marker;
  }
  createInfoWindow(str = ''){
    this.infoWindow = new kakao.maps.InfoWindow({
      content: str
    });
    return this.infoWindow;
  }
}
let searchedPlaces = [];


let clusterer;

function CreateMarkerClusterer(markerList){
  return new kakao.maps.MarkerClusterer({
    map: map,
    markers: markerList,
    gridSize: 35,
    averageCenter: true,
    minLevel: 6,
    disableClickZoom: false
  });
}

function addInfoWindow(){
  searchedPlaces.forEach((place,index,a)=>{
    let thisMarker = place.marker;

    place.createInfoWindow(place.location.place_name);

    // 클릭한 마커가 아니면 윈도우 닫기
    // 클릭한 마커는 윈도우 열기, 맵 이동하기
    kakao.maps.event.addListener(thisMarker, 'click', function(){
      for(let i=0; i<searchedPlaces.length; i++){
        if(i !== index){
          searchedPlaces[i].infoWindow.close();
        }
        else{
          place.infoWindow.open(map, thisMarker);

          map.panTo(new kakao.maps.LatLng(
            thisMarker.getPosition().getLat(),
            thisMarker.getPosition().getLng()
          ));
        }
      }
    });
    kakao.maps.event.addListener(map, 'click', function(){
      place.infoWindow.close();
    });
  });
}

function createMarker(searchResult){
  const markers = [];
  
  searchResult.forEach((location, index) => {
    let newPlace = new searchedPlace(location);

    // let newMarker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(Number(location.y), Number(location.x))
    // });
    let newMarker = newPlace.createMarker(location.y, location.x);

    // searchedPlaces.push(new searchedPlace(location, newMarker));
    searchedPlaces.push(newPlace);

    markers.push(newMarker);
  })
  addInfoWindow();
  // 마커 클러스터러
  clusterer = CreateMarkerClusterer(markers);
}

const categorySearchCallback = function(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    // console.log("category search results");
    // console.log(result);
    createMarker(result);
  }
};



// 검색 서비스
var places = new kakao.maps.services.Places();

// // 키워드 검색 기능
// places.keywordSearch('ATM', callback);

// 카테고리 검색 기능 (영역 지정 필수)
places.categorySearch('BK9', categorySearchCallback, {
  location: new kakao.maps.LatLng(37.5606421, 126.9678918),
  useMapCenter: false,
  useMapBounds: false
});



// // 주소 좌표 변환 서비스
// var geocoder = new kakao.maps.services.Geocoder();

// // 주소 -> 좌표 기능
// geocoder.addressSearch('해남군 송지면', callback);

