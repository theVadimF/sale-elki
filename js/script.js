function MyTransition( Splide, Components ) {
  const { Move } = Components;
  const { list } = Components.Elements;

  let endCallback;

  function start( index, done ) {
    // Converts the index to the position
    const destination = Move.toPosition( index, true );

    // Applies the CSS transition
    list.style.transition = 'transform 1000ms cubic-bezier(.44,.65,.07,1.01)';

    // Moves the carousel to the destination.
    Move.translate( destination );

    // Keeps the callback to invoke later.
    endCallback = done;
  }

  function cancel() {
    list.style.transition = '';
  }

  return {
    start,
    cancel,
  };
}

let main_pics = new Splide('.main_pics', {
  focus: 'center',
  type: 'loop',
  perPage: 3,
  arrows: false,
  gap: '50%',
  pagination: false,
  updateOnMove: true,
  autoplay: true,
  pauseOnHover: false,
  interval: 4000,
});
main_pics.mount({}, MyTransition);

const desktop_width = 1650;

async function animate_top() {
  await new Promise(r => setTimeout(r, 2000));
  $('.top_banner .content').addClass('__clipped');
  await new Promise(r => setTimeout(r, 1000));
  $('.top_banner .content').hide();
  $('.main_pics').fadeIn();
  main_pics.refresh();
}

async function animate_buttons() {
  $('.bottom_blocks .block').removeClass('__initial');
}

async function animate_about() {
  $('.about_box').removeClass('__initial');
  await new Promise(r => setTimeout(r, 1000));
  if (window.innerWidth > desktop_width) {
    $('.about_box .content').removeClass('__initial');
    $('.about_box .shade').removeClass('__initial');
  } else {
    $('.about_box .content').slideDown();
    await new Promise(r => setTimeout(r, 500));
    $('.about_box .shade').removeClass('__initial');
  }
}

// let product_pics = new Splide('.product_slider', {
//   pagination: false,
//   arrows: false,
//   gap: 200,
//   padding: 106,
// });
// product_pics.mount({}, MyTransition);

$('.product_slider').each(function() {
  let product_pics = new Splide(this, {
    pagination: false,
    arrows: false,
    gap: 24,
    padding: 106,
    perPage: 3,
  });
  $(this).children('.button_wrap.__right').children('button').click(function() {
    product_pics.go('>')
  })
  $(this).children('.button_wrap.__left').children('button').click(function() {
    product_pics.go('<')
  })
  product_pics.mount();
})

$('.recents_slider').each(function() {
  let product_recent = new Splide(this, {
    pagination: false,
    arrows: false,
    gap: 24,
    padding: 27,
    perPage: 4,
  });
  $(this).children('.button_wrap.__right').children('button').click(function() {
    product_recent.go('>')
  })
  $(this).children('.button_wrap.__left').children('button').click(function() {
    product_recent.go('<')
  })
  product_recent.mount();
})

animate_top();

function trigger_animation(element, callback) {
  if ($(element).hasClass('__initial')){
    let scrollTop = $(window).scrollTop(),
      windowHeight = $(window).height(),
      elem = $(element).offset().top,
      final = elem - windowHeight,
      distance = final - scrollTop;
    if (distance < -50) {
      callback();
    }
  }
}

$(window).scroll(function () {
  trigger_animation('.block', animate_buttons);
  trigger_animation('.about_box', animate_about);
});