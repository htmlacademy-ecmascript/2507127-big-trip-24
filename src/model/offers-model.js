import { mockOffers } from '../mock/mock-offers';


export default class OffersModel{
  #offers = mockOffers;

  get offers(){
    return this.#offers;
  }

  get allTypes(){
    const types = [];
    [...this.#offers].map((item) => types.push(item.type));
    return types;
  }

  getOffersByType(type) {
    return this.#offers.find((item) => item.type === type);
  }

  getOffersById(type, offersId) {
    const targetOffers = this.getOffersByType(type).offers;
    return targetOffers.filter((item) => offersId.find((id) => item.id === id));
  }

}
