import { useState, useEffect, useContext } from "@wordpress/element";
import { useSelector, useDispatch } from 'react-redux'
import { saveSettings } from '../store/settings'
import { redirect } from "react-router-dom";
import { AppLocalizeContext } from "../App";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

import setting1 from '../../assets/images/setting-1.png';
import setting2 from '../../assets/images/setting-2.png';
import setting3 from '../../assets/images/setting-3.png';

export default () => {
  const appLocalizer = useContext(AppLocalizeContext)
  const __ = wp.i18n.__

  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const [consumer_key, setConsumerKey] = useState('')
  const [consumer_secret, setConsumerSecret] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const formSaveSettings = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    let formData = new FormData()
    formData.append('consumer_key', consumer_key || '')
    formData.append('consumer_secret', consumer_secret || '')

    fetch(`${appLocalizer.apiURL}/wpt/v1/settings`, { 
      method: 'post',
      body: formData
    })
      .then((res) => res.json())
      .then(data => {
        if (data.status == 500) {
          throw data
        }
        dispatch(saveSettings(data.data))

        setSuccess("Mission complete")
      })
      .catch(e => {
        setError(e.text)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    const load = async () => {
      if (settings.consumer_key && settings.consumer_secret) {
        setConsumerKey(settings.consumer_key)
        setConsumerSecret(settings.consumer_secret)
        return
      }
  
      setLoading(true)

      await fetch(`${appLocalizer.apiURL}/wpt/v1/settings`)
      .then(res => res.json())
      .then(data => {
        if (!data.data.consumer_key || !data.data.consumer_secret) {
          throw new Error("error")
        }

        dispatch(saveSettings(data.data))

        setConsumerKey(data.data.consumer_key)
        setConsumerSecret(data.data.consumer_secret)
      })
      .catch(e => console.log(e))
  
      setLoading(false)
    }
    
    load()
  },[])

  const pagination = {
    "clickable": true,
    "renderBullet": function (index, className) {
      return '<span class=\"' + className + '\">' + (index + 1) + '</span>';
    }
  }

  return(
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="!text-xl font-semibold py-4">{__('Let\'s get you started 🚀', 'woo-product-tab')}</h1>
      <div className="mt-4">
        <div className="relative">
          <div className="w-full bg-white rounded shadow p-4 space-y-4">
            <div>
              <span className="text-gray-800">{__('You need to set up a consumer key for your plugin','woo-product-tab')}</span>
            </div>
            <h1 className="font-semibold">{__('1. Create woocommere rest api key','woo-product-tab')}</h1>
            <p>
              {__('Go to the following link', 'woo-product-tab')}{" "}
              <a href={appLocalizer.adminURL + "admin.php?page=wc-settings&tab=advanced&section=keys"} target="_blank" className="text-blue-600">
                {__('Woo setting', 'woo-product-tab')}
              </a>
              {" "}{__('to create rest api key', 'woo-product-tab')}
            </p>

            <div className="slide">
              <Swiper
                spaceBetween={50}
                slidesPerView={1.2}
                onSlideChange={() => console.log('slide changes')}
                pagination={pagination} 
                navigation={true}
                modules={[Pagination, Navigation]} 
                className="started-slide"
              >
                <SwiperSlide className="h-auto">
                  <div className="w-full h-full border-2 rounded border-rose-600">
                    <img src={setting1} alt="" className="block" />
                    <div className="p-2">
                      <p>- {__('Step 1 click add key at the woocommerce setting page as shown', 'woo-product-tab')}</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="h-auto">
                  <div className="w-full h-full border-2 rounded border-rose-600">
                    <img src={setting2} alt="" className="block" />
                    <div className="p-2">
                      <p>- {__('Enter any description for your plugin', 'woo-product-tab')}</p>
                      <p>- {__('Select the account you are logged in with', 'woo-product-tab')}</p>
                      <p>- {__('Select Permissions is Read or Read/Write', 'woo-product-tab')}</p>
                      <p className="text-blue-600">{__('Chose Generate API key', 'woo-product-tab')}</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="h-auto">
                  <div className="w-full h-full border-2 rounded border-rose-600">
                    <img src={setting3} alt="" className="block" />
                    <div className="p-2">
                      <p>- {__('Coppy Consumer key and Consumer secret and paste into the form below', 'woo-product-tab')}</p>
                      <p className="text-red-600">* {__('Do not close the page before copying (Consumer key and Consumer secret only shows up once when creating)', 'woo-product-tab')}</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <h1 className="font-semibold">{__('2. Save woocommere rest api key','woo-product-tab')}</h1>
            <p>{__('Coppy Consumer key and Consumer secret and paste into the form', 'woo-product-tab')}</p>
            <div className="relative">
              <div className="mb-6">
                <label
                  htmlFor="consumer_key"
                  className="block mb-2 text-sm text-gray-900 font-semibold capitalize"
                >
                  consumer_key
                </label>
                <input
                  type="text"
                  id="consumer_key"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="consumer_key"
                  value={consumer_key}
                  onChange={((e) => setConsumerKey(e.target.value))}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="consumer_secret"
                  className="block mb-2 text-sm text-gray-900 font-semibold capitalize"
                >
                  consumer_secret
                </label>
                <input
                  type="text"
                  id="consumer_secret"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="consumer_secret"
                  value={consumer_secret}
                  onChange={((e) => setConsumerSecret(e.target.value))}
                  required
                />
              </div>
              {error ?
                <div className="mt-6">
                  <span className="text-red-600">{error}</span>
                </div>
              : null}
              {success ?
                <div className="mt-6">
                  <span className="text-green-600">{success}</span>
                </div>
              : null}
              <button
                onClick={formSaveSettings}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>

              {loading ?
                <div className="absolute w-full h-full top-0 left-0 grid place-items-center bg-white/30">
                  <span className="block text-green-500 animate-spin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{fill: 'currentcolor'}}
                    >
                      <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
                    </svg>
                  </span>
                </div>
              : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}