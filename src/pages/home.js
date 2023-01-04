import { useState, useEffect, useContext } from "@wordpress/element";
import { useSelector, useDispatch } from 'react-redux'
import { saveSettings } from '../store/settings'
import { redirect } from "react-router-dom";
import { AppLocalizeContext } from "../App";
import Loading from "../components/loading";
import { NavLink } from "react-router-dom";

export default () => {
  const appLocalizer = useContext(AppLocalizeContext)

  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])

  const __ = wp.i18n.__

  useEffect(() => {
    const load = async () => {
      let temp_settings = settings

      if (!settings.consumer_key || !settings.consumer_secret) {
        await fetch(`${appLocalizer.apiURL}/wpt/v1/settings`)
          .then(res => res.json())
          .then(data => {
            if (!data.data.consumer_key || !data.data.consumer_secret) {
              throw new Error("error")
            }
            dispatch(saveSettings(data.data))

            temp_settings = data.data
          })
          .catch(e => redirect('/started'))
      }

      await fetch(`${appLocalizer.apiURL}/wc/v3/products?consumer_key=${temp_settings.consumer_key}&consumer_secret=${temp_settings.consumer_secret}`)
        .then(res => {
          if(res.status !== 200)
          {
            throw new Error(response.status)
          }
          const data = res.json()
          setProducts(data)
        })
        .catch(e => setError(true))

      setLoading(false)
    }

    load()
  }, [])

  return(
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="!text-xl font-semibold py-4">{__('Welcome to Woocommerce product tab 🚀' ,'woo-product-tab')}</h1>
      <div className="mt-4">
        { loading 
        ? <Loading />
        : error
        ? <div className="relative">
            <div className="w-full bg-white rounded shadow p-4 space-y-4">
              <h1 className="font-semibold">{__('An error occurred' ,'woo-product-tab')}</h1>
              <p>
                - {__('Maybe the rest api key you created is not correct, please try upadte Consumer key at' ,'woo-product-tab')}{" "}
                <NavLink to="/settings" className="text-blue-600">{__('Settings' ,'woo-product-tab')}</NavLink>
              </p>
              <p>- {__('If not, please check your link is https' ,'woo-product-tab')}{" "}</p>
            </div>
        </div>
        : <div className="relative">
            <div className="w-full bg-white rounded shadow p-4 space-y-4">
              { products.length > 0 
              ? <div>
                  <a
                    href={`${appLocalizer.customizeURL}?url=${products[0].permalink}`}
                    className="inline-block px-8 py-4 bg-rose-600 hover:bg-rose-500 shadow rounded text-white text-base font-semibold"
                    target="_blank"
                  >
                    {__('Go to Customize setting' ,'woo-product-tab')}
                  </a>

                  <table className="mt-6 w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3 px-6">{__('Image' ,'woo-product-tab')}</th>
                        <th scope="col" className="py-3 px-6">{__('Name' ,'woo-product-tab')}</th>
                        <th scope="col" className="py-3 px-6">{__('Price' ,'woo-product-tab')}</th>
                        <th scope="col" className="py-3 px-6 text-center">{__('Action' ,'woo-product-tab')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      { products.map((product, index) => {
                        return(
                          <tr className="bg-white border-b">
                            <td className="py-4 px-6">
                              <img className="w-20 h-20 object-fill " src={product.images.length > 0 ? product.images[0].src : ''} />
                            </td>
                            <td className="text-blue-500 font-semibold">{product.name}</td>
                            <td className="py-4 px-6" dangerouslySetInnerHTML={{__html: product.price_html}}></td>
                            <td className="py-4 px-6 w-0">
                              <a 
                                href={`${appLocalizer.customizeURL}?url=${product.permalink}`} 
                                target="_blank"
                                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white font-semibold"
                              >
                                {__('Customize' ,'woo-product-tab')}
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              : <div className="text-xl">{__('Can\'t find any products' ,'woo-product-tab')}</div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}