var wptTabMainFunc = () => {
  let app = window.wpt_tabs_customize

  // let list_tab_child = [
  //   {
  //     name: 'custom',
  //     active: true
  //   },
  //   {
  //     name: 'product',
  //     active: true
  //   }
  // ]

  let parents = document.querySelectorAll('.wpt-customize-control-tabs')

  parents.forEach(parent => {
    // variable
    let wpt_tabs_value = parent.querySelector('.product-tabs-value')
    
    let wpt_list          = parent.querySelector('.wpt-list')
    let wpt_btn_add       = parent.querySelector('.wpt-btn-add')

    let wpt_modal_edit                   = parent.querySelector('.wpt-modal-edit')
    let wpt_modal_tab_id                 = wpt_modal_edit.querySelector('.wpt-modal-tab-id')
    let wpt_modal_checkbox_active        = wpt_modal_edit.querySelector('.wpt-modal-checkbox-active')
    let wpt_modal_checkbox_active_mobile = wpt_modal_edit.querySelector('.wpt-modal-checkbox-active-mobile')
    let wpt_modal_id                     = wpt_modal_edit.querySelector('.wpt-modal-id')
    let wpt_modal_title                  = wpt_modal_edit.querySelector('.wpt-modal-title')
    let wpt_modal_display                = wpt_modal_edit.querySelector('.wpt-modal-display')
    let wpt_btn_close_modal_edit         = wpt_modal_edit.querySelector('.btn-del')
    
    let wpt_modal_child_edit             = parent.querySelector('.wpt-modal-edit-child')

    let event = new CustomEvent('change', {'detail': wpt_tabs_value})

    // TODO: default value
    let list_tab_default = JSON.parse(wpt_tabs_value.value || '[]')

    let item_key = 0
    let list_tab = new Proxy({data: list_tab_default}, {
      set: function(target, prop, val, receiver) {
        target[prop] = val

        let new_data = val.map((v,i) => {
          return {
            ...v,
            position:i
          }
        })

        if (wpt_tabs_value) {
          wpt_tabs_value.value = JSON.stringify(new_data)
        }
        console.log(new_data)
        
        wpt_tabs_value.dispatchEvent(event)

        return true;
      }
    })
    let item_key_child = 0
    let list_tab_child = []

    console.log(list_tab)

    // TODO: event to tab list
    // sortable
    if (wpt_list) {
      let wpt_sortable = Sortable.create(wpt_list, {
        animation: 150,
        handle: '.handle',
        ghostClass: 'blue-bg-class',
        onEnd: function (e) {
          // console.log(e.oldIndex, e.newIndex);
          [list_tab.data[e.oldIndex], list_tab.data[e.newIndex]] = [list_tab.data[e.newIndex], list_tab.data[e.oldIndex]]
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
        },
      });
    }

    // add sortable
    if (wpt_btn_add) {
      wpt_btn_add.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        let item = document.createElement("li")
        item.innerHTML = `
          <div class="item">
            <div class="text">${app?.localize?.custom_tab || 'Custom tab'}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${item_key}">
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${item_key}"><i class='bx bx-x' ></i></span>
            </div>
          </div>
        `

        addEventToItem(item)

        wpt_list.appendChild(item)

        list_tab.data.push({
          id: 'custom',
          position: item_key++,
          type: 'core',
          title: app?.localize?.custom_tab || 'Custom tab',
          description: '',
          active: true,
          mobile_active: true,
          icon: '',
          display: 'inherit'
        })

        list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
      })
    }

    let addEventToItem = (item) => {
      let btn_del = item.querySelector('.icon-del')
      let btn_edit = item.querySelector('.icon-edit')
      let btn_active = item.querySelector('.form-check')

      // delete item
      if (btn_del) {
        btn_del.addEventListener('click', e => {
          e.preventDefault()
          e.stopPropagation()

          let parent = btn_del.closest('li')
          if (parent) {

            // delete data in list
            let id_temp = btn_del.dataset.id
            let key_temp = list_tab.data.findIndex(v => v.position == id_temp)
            if (key_temp >= 0) {
              list_tab.data.splice(key_temp, 1)
              list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
            }

            // delete element
            parent.remove()

            // close modal
            if (wpt_modal_tab_id.value == id_temp) {
              wpt_modal_edit.classList.add('hide')
            }
          }
        })
      }

      // edit item
      if (btn_edit) {
        let id_temp = btn_edit.dataset.id
        btn_edit.addEventListener('click', openModalEdit(id_temp))
      }

      // active item
      if (btn_active) {
        let id_temp = btn_active.dataset.id
        btn_active.addEventListener('change', e => {
          let temp_item_tab_index = list_tab.data.findIndex(v => v.position == id_temp)

          if (temp_item_tab_index >= 0) {
            list_tab.data[temp_item_tab_index].active = e.currentTarget.checked
            list_tab.data = JSON.parse(JSON.stringify(list_tab.data))

            if (wpt_modal_tab_id.value == id_temp) {
              wpt_modal_checkbox_active.checked = e.currentTarget.checked
            }
          }
        })
      }
    }

    let openModalEdit = (id) => (event) => {
      if (!wpt_modal_edit) return

      if (wpt_modal_tab_id) {
        let temp_item_tab = list_tab.data.find(v => v.position == id)

        if (!temp_item_tab) return
        
        wpt_modal_tab_id.value = id
        wpt_modal_checkbox_active.checked = temp_item_tab.active
        wpt_modal_checkbox_active_mobile.checked = temp_item_tab.active_mobile
        wpt_modal_id.value = temp_item_tab.id
        wpt_modal_title.value = temp_item_tab.title
        wpt_modal_display.value = temp_item_tab.display
      }

      wpt_modal_edit.classList.remove('hide')
      wpt_modal_child_edit.classList.add('hide')
    }

    let addEventToModal = () => {
      // edit modal
      wpt_modal_checkbox_active.addEventListener('change', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.position == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          list_tab.data[temp_item_tab_index].active = e.currentTarget.checked
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))

          let temp_tab_active = parent.querySelector(`.wpt-list > li > .item .form-check[data-id="${wpt_modal_tab_id.value}"]`)
          if (temp_tab_active) {
            temp_tab_active.checked = e.currentTarget.checked
          }
        }
      })

      wpt_modal_checkbox_active_mobile.addEventListener('change', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.position == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          list_tab.data[temp_item_tab_index].active_mobile = e.currentTarget.checked
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
        }
      })

      wpt_modal_title.addEventListener('input', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.position == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          list_tab.data[temp_item_tab_index].title = e.target.value
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
        }
      })

      wpt_modal_display.addEventListener('change', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.position == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          list_tab.data[temp_item_tab_index].display = e.currentTarget.value
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
        }
      })

      // close modal
      if (wpt_btn_close_modal_edit) {
        wpt_btn_close_modal_edit.addEventListener('click', e => {
          wpt_modal_edit.classList.add('hide')
        })
      }

      //resize modal
      let wpt_left_side = document.querySelector('#customize-controls')
      let wpt_resizeObserver = new ResizeObserver((entries) => {
        let temp_size = 300;
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            // Firefox implements `contentBoxSize` as a single content rect, rather than an array
            let contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

            temp_size = contentBoxSize.inlineSize
          } else {
            temp_size = entry.contentRect.width
          }
        }

        wpt_modal_edit.style.setProperty("--left-width", temp_size + 1 + 'px');
        wpt_modal_child_edit.style.setProperty("--left-width", temp_size + 1 + 'px');
      }).observe(wpt_left_side)
    }

    // TODO: render dom list tab on load window
    list_tab.data.forEach(tab => {
      let item = document.createElement("li")
      if (tab.id == 'description') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${tab.title}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${item_key}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key}"><i class='bx bxs-edit' ></i></span>
            </div>
          </div>
          <ul class="wpt-list-child list-child"></ul>

          <div class="wpt-btn-add-child btn btn-custom">${app.localize.add_new || 'Add new'}</div>
        `
      }
      else if (tab.id == 'reviews') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${tab.title}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${item_key}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key}"><i class='bx bxs-edit' ></i></span>
            </div>
          </div>
        `
      }
      else if (tab.id == 'additional_information') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${tab.title}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${item_key}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key}"><i class='bx bxs-edit' ></i></span>
            </div>
          </div>
        `
      }
      else if (tab.id == 'custom') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${app?.localize?.custom_tab || 'Custom tab'}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${item_key}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${item_key}"><i class='bx bx-x' ></i></span>
            </div>
          </div>
        `
      }

      addEventToItem(item)

      wpt_list.appendChild(item)

      tab.position = item_key++
    })

    // ! list tab child
    // TODO: letiable elements list tab child
    let wpt_list_child    = wpt_list.querySelector('.wpt-list-child')
    let wpt_btn_add_child = wpt_list.querySelector('.wpt-btn-add-child')
    let wpt_btn_close_modal_child_edit = wpt_modal_child_edit.querySelector('.btn-del')
    let wpt_modal_tab_child_id = wpt_modal_child_edit.querySelector('.wpt-modal-tab-child-id')

    // TODO: event to tab list child
    if (wpt_list_child) {
      let wpt_sortable_child = Sortable.create(wpt_list_child, {
        // group: 'nested',
        animation: 150,
        handle: '.handle',
        ghostClass: 'blue-bg-class',
        onEnd: function (e) {
          [list_tab_child[e.oldIndex], list_tab_child[e.newIndex]] = [list_tab_child[e.newIndex], list_tab_child[e.oldIndex]]
        },
        // fallbackOnBody: true,
        // swapThreshold: 0.65
      });
    }

    // TODO: event to child tab list
    // add sortable child
    if (wpt_btn_add_child) {
      wpt_btn_add_child.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        let item = document.createElement("li")
        item.innerHTML = `
          <div class="item">
            <div class="text"><?php echo __( 'Custom tab content', 'woo-product-tabs' ) ?> ${++list_tab_child_custom_key}</div>
            <div class="control">
              <div class="check">
                <input class="checkbox-child-${item_key_child} sr-only" type="checkbox">
                <label for="checkbox_child_${item_key_child}" class="icon icon-show">
                  <i class='bx bx-show' ></i>
                </label>
                <label for="checkbox_child_${item_key_child}" class="icon icon-vision">
                  <i class='bx bx-low-vision' ></i>
                </label>
              </div>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key_child}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${item_key_child}"><i class='bx bx-x' ></i></span>
            </div>
          </div>
        `

        addEventToItemChild(item)

        wpt_list_child.appendChild(item)

        list_tab_child.push({
          name: 'custom',
          key: item_key_child++
        })
      })
    }

    let addEventToItemChild = (item) => {
      let btn_del = item.querySelector('.icon-del')
      let btn_edit = item.querySelector('.icon-edit')

      // delete item
      if (btn_del) {
        btn_del.addEventListener('click', e => {
          e.preventDefault()
          e.stopPropagation()

          let parent = btn_del.closest('li')
          if (parent) {

            // delete data in list
            let id_temp = btn_del.dataset.id
            let key_temp = list_tab_child.findIndex(v => v.position == id_temp)
            if (key_temp >= 0) {
              list_tab_child.splice(key_temp, 1)
            }

            // delete element
            parent.remove()

            // colse modal
            if (wpt_modal_tab_child_id.value == id_temp) {
              wpt_modal_child_edit.classList.add('hide')
            }
          }
        })
      }

      // edit
      if (btn_edit) {
        let id_temp = btn_edit.dataset.id
        btn_edit.addEventListener('click', openModalChildEdit(id_temp))
      }
    }

    let openModalChildEdit = (id) => (event) => {
      if (!wpt_modal_child_edit) return

      if (wpt_modal_tab_child_id) {
        wpt_modal_tab_child_id.value = id
      }

      wpt_modal_edit.classList.add('hide')
      wpt_modal_child_edit.classList.remove('hide')
    }

    let addEventToModalChild = () => {
      // close modal
      if (wpt_btn_close_modal_child_edit) {
        wpt_btn_close_modal_child_edit.addEventListener('click', e => {
          wpt_modal_child_edit.classList.add('hide')
        })
      }
    }

    // TODO: render dom list tab child on load window
    list_tab_child.forEach(v => {
      let item = document.createElement("li")

      if (v.name == 'product') {
        item.innerHTML = `
          <div class="item">
            <div class="text"><?php echo __( 'Product description', 'woo-product-tabs' ) ?></div>
            <div class="control">
              <div class="check">
                <input class="checkbox-child-${item_key_child} sr-only" type="checkbox" ${v.active ? 'checked' : ''}>
                <label for="checkbox_child_${item_key_child}" class="icon icon-show">
                  <i class='bx bx-show' ></i>
                </label>
                <label for="checkbox_child_${item_key_child}" class="icon icon-vision">
                  <i class='bx bx-low-vision' ></i>
                </label>
              </div>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key_child}"><i class='bx bxs-edit' ></i></span>
            </div>
          </div>
        `
      }
      else if (v.name == 'custom') {
        item.innerHTML = `
          <div class="item">
            <div class="text"><?php echo __( 'Custom tab content', 'woo-product-tabs' ) ?> ${++list_tab_child_custom_key}</div>
            <div class="control">
              <div class="check">
                <input class="checkbox-child-${item_key_child} sr-only" type="checkbox" ${v.active ? 'checked' : ''}>
                <label for="checkbox_child_${item_key_child}" class="icon icon-show">
                  <i class='bx bx-show' ></i>
                </label>
                <label for="checkbox_child_${item_key_child}" class="icon icon-vision">
                  <i class='bx bx-low-vision' ></i>
                </label>
              </div>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${item_key_child}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${item_key_child}"><i class='bx bx-x' ></i></span>
            </div>
          </div>
        `
      }

      addEventToItemChild(item)

      wpt_list_child.appendChild(item)

      v.position = item_key_child++
    })

    // TODO: onload window
    // first add event and value on load window
    let addEventOnLoad = () => {
      addEventToModal()
      addEventToModalChild()

      wp.editor.initialize('wpt_modal_tab_child_content', {
        tinymce: {
          wpautop: true,
          plugins : 'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
          toolbar1: 'bold italic underline strikethrough | bullist numlist | blockquote hr wp_more | alignleft aligncenter alignright | link unlink | fullscreen | wp_adv',
          toolbar2: 'formatselect alignjustify forecolor | pastetext removeformat charmap | outdent indent | undo redo | wp_help'
        },
        quicktags: {},
        mediaButtons: true,
      })
    }

    addEventOnLoad()
  })
}

window.addEventListener('load', _ => {
  jQuery(document).ready(function ($) {
    wptTabMainFunc()
  })
})