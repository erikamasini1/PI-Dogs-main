import React from "react";
import { configure, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import CreateDog from "../components/CreateDog";
import * as actions from "../actions";

configure({ adapter: new Adapter() });

describe("<CreateDog />", () => {
  const state = {
    temperaments: [
      {
        id: 1,
        name: "Stubborn",
      },
    ],
  };
  const mockStore = configureStore([thunk]);
  const { CREATE_DOG } = actions;

  describe("Estructura", () => {
    let createDog;
    let store = mockStore(state);
    beforeEach(() => {
      createDog = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/create"]}>
            <CreateDog />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Should render a form", () => {
      expect(createDog.find("form")).toHaveLength(1);
    });

    it("Should have a label with text NAME", () => {
      expect(createDog.find("label").at(0).text()).toEqual("NAME");
    });

    it("Should render an input for name", () => {
      expect(createDog.find('input[name="name"]')).toHaveLength(1);
    });

    it("Should have a label with text MIN HEIGHT", () => {
      expect(createDog.find("label").at(1).text()).toEqual("MIN HEIGHT");
    });

    it("Should render an input for min height", () => {
      expect(createDog.find('input[name="minHeight"]')).toHaveLength(1);
    });

    it("Should have a label with text MAX HEIGHT", () => {
      expect(createDog.find("label").at(2).text()).toEqual("MAX HEIGHT");
    });

    it("Should render an input for max height", () => {
      expect(createDog.find('input[name="maxHeight"]')).toHaveLength(1);
    });

    it("Should have a label with text MIN WEIGHT", () => {
      expect(createDog.find("label").at(3).text()).toEqual("MIN WEIGHT");
    });

    it("Should render an input for max height", () => {
      expect(createDog.find('input[name="minWeight"]')).toHaveLength(1);
    });

    it("Should have a label with text MAX WEIGHT", () => {
      expect(createDog.find("label").at(4).text()).toEqual("MAX WEIGHT");
    });

    it("Should render an input for max height", () => {
      expect(createDog.find('input[name="maxWeight"]')).toHaveLength(1);
    });

    it("Should have a label with text LIFE SPAN", () => {
      expect(createDog.find("label").at(5).text()).toEqual("LIFE SPAN");
    });

    it("Should render an input for life_span", () => {
      expect(createDog.find('input[name="life_span"]')).toHaveLength(1);
    });

    it("Should have a label with text IMAGE", () => {
      expect(createDog.find("label").at(6).text()).toEqual("IMAGE");
    });

    it("Should render an input for image", () => {
      expect(createDog.find('input[name="image"]')).toHaveLength(1);
    });

    it("should render a button Create for submit", () => {
      expect(createDog.find('button[type="submit"]')).toHaveLength(1);
      expect(createDog.find("button").at(0).text()).toEqual("Create");
    });
  });
});
