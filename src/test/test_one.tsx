import { useEffect, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Card, Space, Divider, Button, Badge, Tag } from "antd";

import LocaleSwitcher from "../component/localeSwitcher";
import { GENDER, PersonFormModel } from "../model/person";
import "./test_one.css";
import { PersonForm } from "../component/form/personForm";

const test = {
  main: "",
  test_1: "layout_and_style_title",
  test_2: "api_title",
  test_3: "form_table_title",
};

enum GEOMETRY {
  square = "square",
  rectangle = "rectangle",
  trapezoid = "trapezoid",
  parallelogram = "parallelogram",
  circle = "circle",
  oval = "oval",
}

const defaultArray: GEOMETRY[] = [
  GEOMETRY.circle,
  GEOMETRY.oval,
  GEOMETRY.parallelogram,
  GEOMETRY.rectangle,
  GEOMETRY.square,
  GEOMETRY.trapezoid,
];

function TestOne() {
  const { t } = useTranslation();
  const [title, setTitle] = useState(() => {
    const saved = localStorage.getItem("title");
    const initialValue = JSON.parse(saved || "");
    return initialValue || "";
  });
  useEffect(() => {
    localStorage.setItem("title", JSON.stringify(title));
  }, [title]);

  function updateTitle(input:string) {
    setTitle(input)
    localStorage.setItem("title", JSON.stringify(input));
  }

  

  const [geoArray, setGeoArray] = useState<GEOMETRY[]>(defaultArray);
  const [arrayLayout, setArrayLayout] = useState<0 | 1>(0);

  function render_geometry(name: string) {
    return (
      <Col span={7} key={name}>
        <Card
          className="button_card"
          bordered={false}
          hoverable
          onClick={() => shuffle()}
        >
          <div className="item_container">
            <div className={`${name} geo`}></div>
          </div>
        </Card>
      </Col>
    );
  }

  function swap_layout() {
    if (arrayLayout === 0) {
      setArrayLayout(1);
    } else {
      setArrayLayout(0);
    }
  }

  function left_shift() {
    const popItem = geoArray.shift();
    setGeoArray([...geoArray, popItem!]);
  }
  function right_shift() {
    const popItem = geoArray.pop();
    setGeoArray([popItem!, ...geoArray]);
  }
  function shuffle() {
    const shuffleArray = geoArray.sort(() => Math.random() - 0.5);
    setGeoArray([...shuffleArray]);
  }

  return (
    <>
      <div>
        <Row align="top" justify={"end"} style={{ paddingBottom: 16 }}>
          <Col span={22}>
            <h2 style={{ margin: 0 }}>{`${t(title)}`}</h2>
          </Col>
          <Col span={2}>
            <LocaleSwitcher />
          </Col>
        </Row>
        <Row justify={"end"} style={{ paddingBottom: 16 }}>
          <Col span={2} style={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={() =>
                updateTitle(test.main)
              }
            >
              {t("main_page")}
            </Button>
          </Col>
        </Row>
        {title === test.main && (
          <div>
            <Row
              gutter={24}
              justify="center"
              align="middle"
              className="item_center"
            >
              <Col span={5}>
                <Card
                  title={t(Object.keys(test)[1])}
                  bordered={false}
                  onClick={() => updateTitle(test.test_1)}
                  hoverable
                >
                  <p>{t(test.test_1)}</p>
                </Card>
              </Col>
              <Col span={5}>
                <Card title={t(Object.keys(test)[2])} bordered={false}>
                  <p>{t(test.test_2)}</p>
                </Card>
              </Col>
              <Col span={5}>
                <Card
                  title={t(Object.keys(test)[3])}
                  bordered={false}
                  onClick={() => updateTitle(test.test_3)}
                  hoverable
                >
                  <p>{t(test.test_3)}</p>
                </Card>
              </Col>
            </Row>
          </div>
        )}
        {title === test.test_1 && (
          <div key={"test_1"}>
            <Row gutter={24} justify="center">
              <Col span={5} className="center_justify">
                <Card
                  className="button_card"
                  bordered={false}
                  hoverable
                  onClick={() => left_shift()}
                >
                  <div className="item_container">
                    <div className="left_triangle"></div>
                  </div>
                </Card>
                <Tag>{t("move_shape")}</Tag>
              </Col>
              <Col span={10} className="center_justify">
                <Card
                  className="button_card"
                  bordered={false}
                  hoverable
                  onClick={() => swap_layout()}
                >
                  <div className="item_container">
                    <div className="up_triangle"></div>
                    <div className="down_triangle"></div>
                  </div>
                </Card>
                <Tag>{t("move_position")}</Tag>
              </Col>
              <Col span={5} className="center_justify">
                <Card
                  className="button_card"
                  bordered={false}
                  hoverable
                  onClick={() => right_shift()}
                >
                  <div className="item_container">
                    <div className="right_triangle"></div>
                  </div>
                </Card>
                <Tag>{t("move_shape")}</Tag>
              </Col>
            </Row>
            <Divider />
            <Row
              gutter={24}
              justify={arrayLayout === 0 ? "end" : "start"}
              style={{ paddingBottom: 24 }}
            >
              {geoArray
                .slice(0, 3)
                .map((item: GEOMETRY) => render_geometry(GEOMETRY[item]))}
            </Row>
            <Row gutter={24} justify={arrayLayout === 0 ? "start" : "end"}>
              {geoArray
                .slice(3, 6)
                .map((item: GEOMETRY) => render_geometry(GEOMETRY[item]))}
            </Row>
          </div>
        )}
        {title === test.test_3 && (
          <>
            <PersonForm />
          </>
        )}

        {/* <h1>{t("Welcome to React")}</h1> */}
      </div>
    </>
  );
}

export default TestOne;
