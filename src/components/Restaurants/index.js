import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardImgOverlay,
  CardSubtitle,
  Button,
} from "reactstrap";
import "./styles.css";
import dFood from "../../assets/default_food.jpg";
// import { restaurants } from '../../constants/data';
import * as actions from "../../logic/actions/restaurants";
import * as selectors from "../../logic/reducers";
import Dropzone from "react-dropzone";
import { uuid } from 'uuidv4';

const Restaurants = ({
  restaurants,
  isLoading,
  isCreating,

  fetchRestaurants,
  createRestaurant,
  selectRestaurant,
}) => {
  //   useEffect(() => {
  //     fetchRestaurants();
  //   }, []);
  console.log(restaurants);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  return (
    <Fragment>
      <header className="bg-white shadow pt-20">
        <div className="w-11/12 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Restaurantes</h1>
        </div>
      </header>

      <div className="min-w-screen flex items-right justify-end font-sans overflow-hidden my-8 mx-8">
        <div className="flex justify-end">
          <button
            className="bg-transparent hover:bg-blue-500 mb-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded justify-end"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Nuevo Restaurante
          </button>
        </div>
      </div>

      {restaurants.length > 0 && (
        <div className="grid grid-cols-4 gap-4 px-8">
          {restaurants.map((restaurant) => (
            <div
              className="max-w-xs rounded overflow-hidden shadow-lg my-2"
              onClick={() => {
                selectRestaurant(restaurant);
                history.push(`/restaurants/${restaurant.id}`);
              }}
            >
              <img
                className="w-full"
                src={restaurant.imageUrl}
                alt={restaurant.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{restaurant.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <section
          class="fixed inset-0 overflow-hidden"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div class="relative w-screen max-w-md">
                <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                  <button
                    class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => setShowModal(false)}
                  >
                    <span class="sr-only">Close panel</span>
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div class="px-4 sm:px-6">
                    <h3 className="text-3xl font-semibold">
                      Crear Restaurante
                    </h3>
                  </div>
                  <div className="relative p-6 flex-auto p-8">
                    <form className="w-full max-w-lg">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Nombre del Restaurante
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-restaurant-name"
                            placeholder="Nombre"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <p className="text-gray-600 text-xs italic">
                            Campo requerido
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Logo del Restaurante
                          </label>

                          <label
                            className="bg-transparent hover:bg-blue-500 mb-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded justify-end mt-5"
                            // onClick={() => setShowModal(true)}
                          >
                            Subir imagen <input type="file" hidden />
                          </label>
                          <span class='label label-info' id="upload-file-info"></span>
                          <br/>
                          
                          <p className="text-gray-600 text-xs italic pt-5">
                            Campo requerido
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="flex m-3 items-center justify-end p-3 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {setShowModal(false); }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={`bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            
                                        onClick={() => {createRestaurant(name);setShowModal(false);}}
                                    >
                                       {'Crear Restaurante'}
                                    </button>
                                </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    restaurants: selectors.getRestaurants(state),
    isLoading: selectors.getIsFetchingRestaurant(state),
    isCreating: selectors.getIsAddingRestaurant(state),
  }),
  (dispatch) => ({
    fetchRestaurants() {
      dispatch(actions.startFetchingRestaurants());
    },
    createRestaurant(name) {
      dispatch(actions.startAddingRestaurant({ id: uuid(),name: name,imageUrl:'https://www.guatemala.com/fotos/2021/01/Nuevas-promociones-2x1-de-Trefratelli-en-la-app-de-Cupones-Guatemala.com-1-885x500.jpg' }));
    },
    selectRestaurant(restaurant) {
      dispatch(actions.selectingRestaurant(restaurant));
    },
  })
)(Restaurants);
