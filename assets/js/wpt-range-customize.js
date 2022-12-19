window.addEventListener('load', _ => {
  jQuery(document).ready(function ($) {
    var wpt_range_field_customize = document.querySelectorAll('.wpt-custom-control-range')
    
    wpt_range_field_customize.forEach(v => {
      let range = v.querySelector('.custom-input-range')
      let input = v.querySelector('.custom-input-text')
      let reset = v.querySelector('.reset')

      let event = new CustomEvent('change', {'detail': range})
      
      if (range) {
        range.addEventListener('change', (e) => {
          if (input && !e.detail) {
            input.value = e.target.value
          }
        })
      }

      if (input) {
        input.addEventListener('blur', (e) => {
          if (range) {
            let value = parseInt(e.target.value)
            let max = parseInt(range.getAttribute("max"))
            let min = parseInt(range.getAttribute("min"))

            if (value > max) {
              input.value = max
              range.value = max
            }
            else if (value < min) {
              input.value = min
              range.value = min
            }
            else {
              input.value = value
              range.value = value
            }

            range.dispatchEvent(event)
          }
        })
      }

      if (reset) {
        reset.addEventListener('click', () => {
          if (range) {
            let default_value = range.dataset.default
            if (default_value) {
              range.value = default_value

              if (input) {
                input.value = default_value
              }
            }
          }
        })
      }
    })

  })
})