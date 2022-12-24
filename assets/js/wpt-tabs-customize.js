var wptTabMainFunc = () => {
  let app = window.wpt_tabs_customize
  let __ = wp.i18n.__

  // ! control tab
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
    let wpt_modal_icons                  = wpt_modal_edit.querySelectorAll('.list-icon .item-icon')
    let wpt_modal_display                = wpt_modal_edit.querySelector('.wpt-modal-display')
    let wpt_btn_close_modal_edit         = wpt_modal_edit.querySelector('.btn-del')

    let wpt_modal_roles                  = wpt_modal_edit.querySelector('.wpt-modal-roles')
    let wpt_input_apis                   = wpt_modal_edit.querySelectorAll('.wpt-input-api')
    
    let wpt_modal_child_edit             = parent.querySelector('.wpt-modal-edit-child')

    let event = new CustomEvent('change', {'detail': wpt_tabs_value})

    // TODO: default value
    let list_tab_default = JSON.parse(wpt_tabs_value.value || '[]')

    let item_key = 0
    let list_tab = new Proxy({data: list_tab_default.sort((a,b) => a.position - b.position)}, {
      set: function(target, prop, val, receiver) {
        target[prop] = val

        if (wpt_tabs_value) {
          wpt_tabs_value.value = JSON.stringify(val)

          console.log(val)
          
          wpt_tabs_value.dispatchEvent(event)
        }

        return true;
      }
    })
    let item_key_child = 0
    let list_tab_child = list_tab_default.find(v => v.id == 'description').children?.sort((a,b) => a.position - b.position) || []

    // TODO: event to tab list
    let changePositionTab = async (array, o, n) => {
      let data = array
      return new Promise(res => {
        if (o > n) {
          // get position
          let index_o = data.findIndex(v => v.position == o)
          let index_data = []
          for(let i = n; i < o; i++) {
            let temp_i = data.findIndex(v => v.position == i)
            index_data.push(temp_i)
          }

          // change position
          if (index_o >= 0)
            data[index_o].position = n

          for(const e of index_data) {
            data[e].position++
          }
        }
        else if (o < n) {
          // get position
          let index_o = data.findIndex(v => v.position == o)
          let index_data = []
          for(let i = n + 1; i <= o; i++) {
            let temp_i = data.findIndex(v => v.position == i)
            index_data.push(temp_i)
          }

          // change position
          if (index_o >= 0)
            data[index_o].position = n

          for(const e of index_data) {
            data[e].position--
          }
        }

        res(data)
      })
    }

    // sortable
    if (wpt_list) {
      let wpt_sortable = Sortable.create(wpt_list, {
        animation: 150,
        handle: '.handle',
        ghostClass: 'blue-bg-class',
        onEnd: async function (e) {
          let o = e.oldIndex,
              n = e.newIndex
          
          if (o == n) return

          let data = await changePositionTab(list_tab.data, o, n)
      
          list_tab.data = data
        },
      });
    }

    // add sortable
    if (wpt_btn_add) {
      wpt_btn_add.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        let id = 'custom-' + countCustomTab()

        let item = document.createElement("li")
        item.innerHTML = `
          <div class="item">
            <div class="text">${__('Custom tab', 'woo-product-tab')}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${id}">
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${id}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${id}"><i class='bx bx-x' ></i></span>
            </div>
          </div>
        `

        addEventToItem(item)

        wpt_list.appendChild(item)

        list_tab.data.push({
          id: id,
          position: item_key++,
          type: 'core',
          title: __('Custom tab', 'woo-product-tab'),
          description: '',
          active: true,
          mobile_active: true,
          icon: '',
          display: 'inherit'
        })

        list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
      })
    }

    let countCustomTab = () => list_tab.data.filter(v => v.id.split("-")[0] == 'custom').length + 1

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
            let key_temp = list_tab.data.findIndex(v => v.id == id_temp)
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
          let temp_item_tab_index = list_tab.data.findIndex(v => v.id == id_temp)

          if (temp_item_tab_index >= 0) {
            list_tab.data[temp_item_tab_index].active = e.currentTarget.checked
            list_tab.data = JSON.parse(JSON.stringify(list_tab.data))

            if (wpt_modal_tab_id.value == id_temp) {
              wpt_modal_checkbox_active.checked = e.currentTarget.checked

              if (wpt_modal_checkbox_active_mobile) {
                wpt_modal_checkbox_active_mobile.disabled = !e.currentTarget.checked
              }
            }
          }
        })
      }
    }

    let openModalEdit = (id) => (event) => {
      if (!wpt_modal_edit) return

      if (wpt_modal_tab_id) {
        let temp_item_tab = list_tab.data.find(v => v.id == id)

        if (!temp_item_tab) return
        
        wpt_modal_tab_id.value = id
        wpt_modal_checkbox_active.checked = temp_item_tab.active
        wpt_modal_checkbox_active_mobile.checked = temp_item_tab.mobile_active
        wpt_modal_checkbox_active_mobile.disabled = !temp_item_tab.active
        wpt_modal_id.value = temp_item_tab.id
        wpt_modal_title.value = temp_item_tab.title

        let none_icon_html = temp_item_tab.icon || `<i class="bx bx-block"></i>`
        wpt_modal_icons.forEach(icon => {
          icon.classList.remove('active')
          if (none_icon_html == icon.firstChild.innerHTML.toString().trim()) {
            icon.classList.add('active')
          }
        })

        wpt_modal_display.value = temp_item_tab.display

        if (temp_item_tab.display == "rules") {
          if (wpt_modal_roles)
            wpt_modal_roles.classList.remove('hide')
        }
        else {
          if (wpt_modal_roles)
            wpt_modal_roles.classList.add('hide')
        }

        wpt_input_apis.forEach(v => {
          let url       = v.dataset.url
          let title_key = v.dataset.title_key
          let role_key  = v.dataset.role_key

          let input_quick_add = v.querySelector('.input-quick-add')
          let list_add        = v.querySelector('.list-add')

          let input_modal = v.querySelector('.input-modal')
          let search_list = v.querySelector('.search-list')

          let role = temp_item_tab.role || {}
          let list_item = role[role_key] || []

          if (list_item.length == 0) {
            search_list.innerHTML = __('Chưa chọn', 'woo-product-tab')
          }
          else {
            console.log(list_item)
          }
        })
      }

      wpt_modal_edit.classList.remove('hide')
      wpt_modal_child_edit.classList.add('hide')
    }

    let addEventToModal = () => {
      // edit modal
      wpt_modal_checkbox_active.addEventListener('change', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.id == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          list_tab.data[temp_item_tab_index].active = e.currentTarget.checked
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))

          let temp_tab_active = parent.querySelector(`.wpt-list > li > .item .form-check[data-id="${wpt_modal_tab_id.value}"]`)
          if (temp_tab_active) {
            temp_tab_active.checked = e.currentTarget.checked
          }

          if (wpt_modal_checkbox_active_mobile) {
            wpt_modal_checkbox_active_mobile.disabled = !e.currentTarget.checked
          }
        }
      })

      wpt_modal_checkbox_active_mobile.addEventListener('change', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.id == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          list_tab.data[temp_item_tab_index].mobile_active = e.currentTarget.checked
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
        }
      })

      wpt_modal_title.addEventListener('blur', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.id == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          list_tab.data[temp_item_tab_index].title = e.target.value
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
        }
      })

      wpt_modal_icons.forEach(icon => {
        icon.addEventListener('click', e => {
          let temp_item_tab_index = list_tab.data.findIndex(v => v.id == wpt_modal_tab_id.value)

          if (temp_item_tab_index >= 0) {
            wpt_modal_icons.forEach(v => {
              v.classList.remove('active')
            })

            let icon_text = icon.firstChild.innerHTML.toString().trim()

            list_tab.data[temp_item_tab_index].icon = icon_text == `<i class="bx bx-block"></i>` ? '' : icon_text
            list_tab.data = JSON.parse(JSON.stringify(list_tab.data))

            icon.classList.add('active')
          }
        })
      })

      wpt_modal_display.addEventListener('change', e => {
        let temp_item_tab_index = list_tab.data.findIndex(v => v.id == wpt_modal_tab_id.value)

        if (temp_item_tab_index >= 0) {
          if (e.currentTarget.value == "rules") {
            if (wpt_modal_roles)
              wpt_modal_roles.classList.remove('hide')
          }
          else {
            if (wpt_modal_roles)
              wpt_modal_roles.classList.add('hide')
          }

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

      wpt_input_apis.forEach(item => {
        addEventInputApi(item)
      })
    }

    // ! input api
    let input_window_outside = null

    let clickOutSide = (el, input_modal) => (event) => {
      const withinBoundaries = event.composedPath().includes(el)
    
      if (!withinBoundaries) {
        input_modal.classList.add('hide')
        document.removeEventListener('click', input_window_outside, true)
      }
    }

    let fetchData = (url, consumer_key, consumer_secret) => {
      return new Promise(async res => {
        await fetch(`${url}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`)
        .then(res => res.json())
        .then(data => res(data))
        .catch(error => res([]))
      })
    }
    
    let addEventInputApi = (el) => {
      let url       = el.dataset.url
      let title_key = el.dataset.title_key
      let role_key  = el.dataset.role_key
    
      let input_quick_add = el.querySelector('.input-quick-add')
      let list_add        = el.querySelector('.list-add')

      let input_modal = el.querySelector('.input-modal')
      let search_list = el.querySelector('.search-list')
    
      input_quick_add.addEventListener('click', async e => {
        e.stopPropagation()
        if (!input_modal.classList.contains('hide')) return
    
        input_modal.classList.remove('hide')
        if(el.getBoundingClientRect().bottom + input_modal.offsetHeight > document.documentElement.scrollHeight) {
          input_modal.classList.add('top')
        }
        else {
          input_modal.classList.remove('top')
        }

        input_window_outside = clickOutSide(el, input_modal)
    
        document.addEventListener('click', input_window_outside, true)

        //* fetch data
        search_list.classList.add('loading')
        let data = await fetchData(url, app.consumer_key, app.consumer_secret)
        search_list.classList.remove('loading')

        let text_childs = ''

        data.forEach(v => {
          text_childs += `
            <div class="list-item" data-id="${v?.id || 0}">${v[title_key] || ''}</div>
          `
        })

        let item = document.createElement("div")
        item.innerHTML = text_childs

        let childs = item.querySelectorAll('.list-item')

        childs.forEach(v => {
          v.addEventListener('click', e => {
            let value = data.find(i => i.id == v.dataset.id)
            let temp_item_tab_index = list_tab.data.findIndex(v => v.id == wpt_modal_tab_id.value)

            if (temp_item_tab_index >= 0) {
              let role = list_tab.data[temp_item_tab_index].role || {}

              if (!(role[role_key] || []).includes(value.id)) {
                let new_list_in_row = (role[role_key] || [])
                new_list_in_row.push(value.id)

                role = {
                  ...role,
                  [role_key]: new_list_in_row
                }

                list_tab.data[temp_item_tab_index].role = role
                list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
  
                let list_item = document.createElement("div")
                list_item.classList.add('list-item')
                list_item.innerText = value.name
      
                list_add.appendChild(list_item)
              }
            }
          })
        })

        search_list.innerHTML = ''
        search_list.appendChild(item)
      })
    }

    // TODO: render dom list tab on load window
    list_tab.data.forEach(tab => {
      let item = document.createElement("li")
      if (tab.id == 'description') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${__('Description', 'woo-product-tab')}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${tab.id}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${tab.id}"><i class='bx bxs-edit' ></i></span>
            </div>
          </div>
          <ul class="wpt-list-child list-child"></ul>

          <div class="wpt-btn-add-child btn btn-custom">${__('Add new', 'woo-product-tab')}</div>
        `
      }
      else if (tab.id == 'reviews') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${__('Reviews', 'woo-product-tab')}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${tab.id}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${tab.id}"><i class='bx bxs-edit' ></i></span>
            </div>
          </div>
        `
      }
      else if (tab.id == 'additional_information') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${__('Additional Information', 'woo-product-tab')}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${tab.id}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${tab.id}"><i class='bx bxs-edit' ></i></span>
            </div>
          </div>
        `
      }
      else {
        item.innerHTML = `
          <div class="item">
            <div class="text">${__('Custom tab', 'woo-product-tab')}</div>
            <div class="control">
              <input type="checkbox" class="form-check" data-id="${tab.id}" ${tab.active ? 'checked': ''}>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${tab.id}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${tab.id}"><i class='bx bx-x' ></i></span>
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
    let wpt_btn_save_child_content = wpt_modal_child_edit.querySelector('.wpt-btn-save-child-content')

    // TODO: event to tab list child
    if (wpt_list_child) {
      let wpt_sortable_child = Sortable.create(wpt_list_child, {
        // group: 'nested',
        animation: 150,
        handle: '.handle',
        ghostClass: 'blue-bg-class',
        onEnd: async function (e) {
          let o = e.oldIndex,
              n = e.newIndex
          
          if (o == n) return

          let data = await changePositionTab(list_tab_child, o, n)
      
          list_tab_child = data
          
          list_tab.data.find(v => v.id == 'description').children = list_tab_child
          list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
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

        let id = 'custom-' + countCustomTabChild()

        item.innerHTML = `
          <div class="item">
            <div class="text">${__( 'Custom tab content', 'woo-product-tabs' )}</div>
            <div class="control">
              <div class="check">
                <input id="checkbox_child_${id}" class="icon-check sr-only" data-id="${id}" type="checkbox">
                <label for="checkbox_child_${id}" class="icon icon-show">
                  <i class='bx bx-show' ></i>
                </label>
                <label for="checkbox_child_${id}" class="icon icon-vision">
                  <i class='bx bx-low-vision' ></i>
                </label>
              </div>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${id}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${id}"><i class='bx bx-x' ></i></span>
            </div>
          </div>
        `

        addEventToItemChild(item)

        wpt_list_child.appendChild(item)

        list_tab_child.push({
          id: id,
          position: item_key_child++,
          title: __( 'Custom tab content', 'woo-product-tabs' ),
          active: true,
          content: ''
        })

        list_tab.data.find(v => v.id == 'description').children = list_tab_child
        list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
      })
    }

    let countCustomTabChild = () => list_tab_child.filter(v => v.id.split("-")[0] == 'custom').length + 1

    let addEventToItemChild = (item) => {
      let btn_del = item.querySelector('.icon-del')
      let btn_edit = item.querySelector('.icon-edit')
      let btn_check = item.querySelector('.icon-check')

      // delete item
      if (btn_del) {
        btn_del.addEventListener('click', e => {
          e.preventDefault()
          e.stopPropagation()

          let parent = btn_del.closest('li')
          if (parent) {
            // delete data in list
            let id_temp = btn_del.dataset.id
            let key_temp = list_tab_child.findIndex(v => v.id == id_temp)
            if (key_temp >= 0) {
              list_tab_child.splice(key_temp, 1)

              list_tab.data.find(v => v.id == 'description').children = list_tab_child
              list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
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

      // check
      if (btn_check) {
        let id_temp = btn_check.dataset.id

        btn_check.addEventListener('change', (e) => {
          let key_temp = list_tab_child.findIndex(v => v.id == id_temp)
          if (key_temp >= 0) {
            list_tab_child[key_temp].active = e.currentTarget.checked
  
            list_tab.data.find(v => v.id == 'description').children = list_tab_child
            list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
          }
        })
      }
    }

    let openModalChildEdit = (id) => (event) => {
      if (!wpt_modal_child_edit) return

      if (wpt_modal_tab_child_id && wpt_modal_tab_child_id.value != id) {
        wpt_modal_tab_child_id.value = id

        let index_tab_child = list_tab_child.findIndex(v => v.id == id)
        tinymce.get("wpt_modal_tab_child_content").setContent(list_tab_child[index_tab_child].content)
      }

      wpt_modal_edit.classList.add('hide')
      wpt_modal_child_edit.classList.remove('hide')
    }

    let addEventToModalChild = () => {
      if (wpt_btn_save_child_content) {
        wpt_btn_save_child_content.addEventListener('click', _ => {
          let index_tab_child = list_tab_child.findIndex(v => v.id == wpt_modal_tab_child_id.value)

          if (index_tab_child >= 0) {
            list_tab_child[index_tab_child].content = tinymce.get("wpt_modal_tab_child_content").getContent()

            list_tab.data.find(v => v.id == 'description').children = list_tab_child
            list_tab.data = JSON.parse(JSON.stringify(list_tab.data))
          }
        })
      }

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

      if (v.id == 'product_description') {
        item.innerHTML = `
          <div class="item">
            <div class="text">${v.title}</div>
            <div class="control">
              <div class="check">
                <input id="checkbox_child_${v.id}" class="icon-check sr-only" data-id="${v.id}" type="checkbox" ${v.active ? 'checked' : ''}>
                <label for="checkbox_child_${v.id}" class="icon icon-show">
                  <i class='bx bx-show' ></i>
                </label>
                <label for="checkbox_child_${v.id}" class="icon icon-vision">
                  <i class='bx bx-low-vision' ></i>
                </label>
              </div>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
            </div>
          </div>
        `
      }
      else {
        item.innerHTML = `
          <div class="item">
            <div class="text">${v.title}</div>
            <div class="control">
              <div class="check">
                <input id="checkbox_child_${v.id}" class="icon-check sr-only" data-id="${v.id}" type="checkbox" ${v.active ? 'checked' : ''}>
                <label for="checkbox_child_${v.id}" class="icon icon-show">
                  <i class='bx bx-show' ></i>
                </label>
                <label for="checkbox_child_${v.id}" class="icon icon-vision">
                  <i class='bx bx-low-vision' ></i>
                </label>
              </div>
              <span class="icon icon-move handle"><i class='bx bx-move' ></i></span>
              <span class="icon icon-edit" data-id="${v.id}"><i class='bx bxs-edit' ></i></span>
              <span class="icon icon-del" data-id="${v.id}"><i class='bx bx-x' ></i></span>
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

    addEventOnLoad()
  })
}

jQuery(document).ready(function ($) {
  wptTabMainFunc()
})