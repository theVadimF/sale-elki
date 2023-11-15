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
  if (window.innerWidth > 1250) {
    $('.about_box .content').removeClass('__initial');
    $('.about_box .shade').removeClass('__initial');
  } else {
    $('.about_box .content').slideDown('slow');
    await new Promise(r => setTimeout(r, 600));
    $('.about_box .shade').removeClass('__initial');
  }
}

$('.product_slider').each(function() {
  let product_pics = new Splide(this, {
    pagination: false,
    arrows: false,
    gap: 24,
    padding: 106,
    perPage: 3,
    breakpoints: {
      1250: {
        perPage: 2,
        padding: 106,
        gap: 24,
      },
      1200: {
        padding: 50,
      },
      950: {
        perPage: 3,
        padding: 33,
        gap: 10,
      },
      560: {
        perPage: 2,
      }, 420: {
        padding: 30,
      }
    }
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
    breakpoints: {
      1250: {
        perPage: 3,
      },
      680: {
        padding: 8,
        gap: 7,
        perPage: 2,
      }
    }
  });
  $(this).children('.button_wrap.__right').children('button').click(function() {
    product_recent.go('>')
  })
  $(this).children('.button_wrap.__left').children('button').click(function() {
    product_recent.go('<')
  })
  product_recent.mount();
})

addEventListener("DOMContentLoaded", () => {
  animate_top();

  if (window.innerWidth < 950) {
    animate_buttons();
  }
});

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

$('.mobile_close').click(async function() {
  $('header').removeClass('__visible')
  await new Promise(r => setTimeout(r, 1000));
  $('header').removeClass('__open');
})

$('.mobile_menu').click(async function() {
  $('header').addClass('__open');
  await new Promise(r => setTimeout(r, 100));
  $('header').addClass('__visible');
})

function star_light() {
  $('.logo_wrap .light').toggleClass('__small');
}

setInterval(star_light, 2000);