// https://apis.map.kakao.com/web/documentation/#Library

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.5607318, 126.9678439), //필수!! 지도의 중심좌표.
  level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


// 컨트롤 추가
var control = new kakao.maps.ZoomControl();
map.addControl(control, kakao.maps.ControlPosition.TOPRIGHT); 

export {map};

class searchedPlace{
  constructor(searchResult){
    this.searchResult = searchResult;
    this.marker = null;
  }
  createMarker(){

  }
  createInfoWindow(str = ''){

  }
}



function CreateMarkClusterer(markerList){
  return new kakao.maps.MarkerClusterer({
    map: map,
    markers: markerList,
    gridSize: 35,
    averageCenter: true,
    minLevel: 6,
    disableClickZoom: false
  });
}




function createMarker(){
  // 검색 결과 각 항목마다
  // 마커 생성, 마커 배열에 추가,
  // 정보창 생성, 정보창 배열에 추가,
  // 마커 클릭/맵 클릭 이벤트 발생 시
  //   정보창 닫기/열기
  searchResult.forEach((element, index) => {
    newMarker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(Number(element.y), Number(element.x))
    })

    categorySearchResultLocation.push(newMarker);

    infoWindow.push(new kakao.maps.InfoWindow({
      content: `infoWindow #${index}`
    }));
    
    kakao.maps.event.addListener(categorySearchResultLocation[index], 'click', function(){
      for(let i=0; i<categorySearchResultLocation.length; i++){
        if(i !== index) infoWindow[i].close();
        else{
          infoWindow[index].open(map, categorySearchResultLocation[index]);
          map.panTo(new kakao.maps.LatLng(
            categorySearchResultLocation[index].getPosition().getLat(),
            categorySearchResultLocation[index].getPosition().getLng()
          ));
        }
      }
      
    });
    kakao.maps.event.addListener(map, 'click', function(){
      infoWindow[index].close();
    });

  })
}



var clusterer;

const searchResult = [];
const categorySearchResultLocation = [];
var categorySearchCallback = function(result, status) {
  let newMarker;
  let infoWindow = [];

  if (status === kakao.maps.services.Status.OK) {

    // searchResult: 카테고리 검색 결과를 저장
    searchResult.push(...result);
    console.log("category search results");
    console.log(searchResult);

    createMarker();
  }
  
  // 마커 클러스터러
  clusterer = CreateMarkClusterer(categorySearchResultLocation);
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

