// Global vars to cache event state
const evCache = new Array();
let prevDiff = -1;

function pointerdown_handler(ev) {
  //    pointerdown 이벤트는 터치 반응이 시작을 알려준다.
  //    두 손가락이 터치하는 이벤트를 감지하기 위해 caching
  evCache.push(ev);
}

function pointermove_handler(ev) {
  // 두 pointer의 핀치 제스쳐 이벤트 시행
  // 두 점의 거리 증감여부에 따라 zoom in, zoom out을 판단한다.
  const voteList = document.querySelector(`.${ev.currentTarget.classList[0]}`);
  // Find this event in the cache and update its record with this event
  for (let i = 0; i < evCache.length; i++) {
    if (ev.pointerId == evCache[i].pointerId) {
      evCache[i] = ev;
      break;
    }
  }

  // pointer가 두 개라면 pinch로 인식
  if (evCache.length == 2) {
    // 두 점의 거리를 계산한다.
    const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

    if (prevDiff > 0 && Math.abs(currDiff - prevDiff) > 30) {
      if (curDiff > prevDiff) {
        // Zoom in(두 점이 멀어질 때) 발생하는 이벤트
        !voteList.classList.contains('zoom') && voteList.classList.add('zoom');
      }
      if (curDiff < prevDiff) {
        // Zoom out시 발생하는 이벤트
        voteList.classList.contains('zoom') &&
          voteList.classList.remove('zoom');
      }
    }

    // Cache the distance for the next move event
    prevDiff = curDiff;
  }
}

// 손가락을 땔 때 시행하는 이벤트 handler
function pointerup_handler(ev) {
  //   이벤트를 제거하여 cache를 초기화시킨다.
  remove_event(ev);

  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) prevDiff = -1;
}

function remove_event(ev) {
  // Remove this event from the target's cache
  for (let i = 0; i < evCache.length; i++) {
    if (evCache[i].pointerId == ev.pointerId) {
      evCache.splice(i, 1);
      break;
    }
  }
}

function init() {
  // Install event handlers for the pointer target
  const el = document.getElementById('voteList');
  el.onpointerdown = pointerdown_handler;
  el.onpointermove = pointermove_handler;

  // Use same handler for pointer{up,cancel,out,leave} events since
  // the semantics for these events - in this app - are the same.
  el.onpointerup = pointerup_handler;
  el.onpointercancel = pointerup_handler;
  el.onpointerout = pointerup_handler;
  el.onpointerleave = pointerup_handler;
}

init();
