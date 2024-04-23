import react, { useState } from "react";
import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import {
  Col,
  Form,
  Row,
  Button,
  Input,
  DatePicker,
  Select,
  Radio,
  Space,
  Table,
} from "antd";
import type { FormProps, TableProps } from "antd";
import { Form as FinalForm, Field } from "react-final-form";

import {
  GENDER,
  Nationality,
  PersonFormModel,
  Prefix,
} from "../../model/person";
import {
  PersonState,
  submitPerson,
  editPerson,
  deletePerson,
  deleteSelect,
  setCurrentPerson,
  clearCurrentPerson,
} from "../../features/persons/personsSlice";
import { FormApi } from "final-form";

export function PersonForm(input?: PersonFormModel) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const persons = useSelector((state: PersonState) => state.persons);
  const current = useSelector((state: PersonState) => state.currentPerson);

  const required = (value: any) => (value ? undefined : "Required");
  const mustBeNumber = (value: number) =>
    isNaN(value) ? "Must be a number" : undefined;
  const exactValue = (exact: number) => (value: number) =>
    isNaN(value) || value == exact ? undefined : `Should be ${exact} digits`;
  const nationalIdValue = (value: string) =>
    !value || (value && /^[0-9]\d{12}$/.test(value)) ? undefined : "invalid";
  const phoneNumberValue = (value: string) =>
    value && /^(0[689]{1})+([0-9]{8})$/.test(value) ? undefined : "invalid";
  const passportValue = (value: string) =>
    !value || (value && /^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(value))
      ? undefined
      : "invalid";
  const composeValidators =
    (...validators: any[]) =>
    (value: any) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

  function onSubmit(values: PersonFormModel, form: FormApi) {
    if (values.id == undefined) {
      const id = crypto.randomUUID();
      //   const date_of_birth = new Date(values.date_of_birth!)
      //   console.log(date_of_birth);
      const submitValue: PersonFormModel = {
        id: id,
        date_of_birth: values.date_of_birth,
        prefix: values.prefix,
        first_name: values.first_name,
        last_name: values.last_name,
        nationality: values.nationality,
        national_id: values.national_id,
        gender: values.gender,
        passport_id: values.passport_id,
        expected_salary: values.expected_salary,
        phone_number: values.phone_number,
      };
      //   console.log(JSON.stringify(submitValue));
      dispatch(submitPerson(submitValue));
      form.restart();
    } else {
      const submitValue: PersonFormModel = {
        id: values.id,
        date_of_birth: values.date_of_birth,
        prefix: values.prefix,
        first_name: values.first_name,
        last_name: values.last_name,
        nationality: values.nationality,
        national_id: values.national_id,
        gender: values.gender,
        passport_id: values.passport_id,
        expected_salary: values.expected_salary,
        phone_number: values.phone_number,
      };
      //   console.log(JSON.stringify(submitValue));
      dispatch(editPerson({ id: values.id, values: submitValue }));
      dispatch(clearCurrentPerson());
      form.restart();
    }
  }

  const columns: TableProps<PersonFormModel>["columns"] = [
    {
      title: "ชื่อ",
      dataIndex: ["first_name", "last_name"],
      key: "first_name",
      render: (text, row) => <>{`${row.first_name} ${row.last_name}`}</>,
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      key: "gender",
      render: (text, row) => <>{`${row.gender}`}</>,
    },
    {
      title: "หมายเลขโทรศัพท์มือถือ",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "สัญชาติ",
      dataIndex: "nationality",
      key: "nationality",
      render: (text, row) => <>{`${row.nationality}`}</>,
    },
    {
      title: "action",
      key: "action",
      render: (text, row) => (
        <Space>
          <a
            onClick={() => {
              dispatch(setCurrentPerson(row.id!));
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              dispatch(deletePerson(row.id!));
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="horizontal_center form_bordered">
        <FinalForm
          onSubmit={onSubmit}
          name="person"
          initialValues={current ?? undefined}
          render={({ handleSubmit, form, values }) => (
            <Form layout="horizontal" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={4}>
                  <Field
                    //   label="คำนำหน้า"
                    name={"prefix"}
                    //   rules={[{ required: true }]}
                    //   component="select"
                    validate={required}
                  >
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="คำนำหน้า"
                        // rules={[{ required: true }]}
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Select {...input} {...rest} allowClear>
                          {Object.entries(Prefix).map(([value, display]) => (
                            <Select.Option value={value} key={display}>
                              {t(display)}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Field>
                </Col>

                <Col span={10}>
                  <Field
                    //   label="ชื่อจริง"
                    name={"first_name"}
                    //   rules={[{ required: true }]}
                    validate={required}
                  >
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="ชื่อจริง"
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Input {...input} {...rest} />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
                <Col span={10}>
                  <Field label="นามสกุล" name={"last_name"} validate={required}>
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="นามสกุล"
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Input {...input} {...rest} />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col>
                  <Field name={"date_of_birth"} validate={required}>
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="วันเกิด"
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <DatePicker
                          {...input}
                          {...rest}
                          format={"DD-MM-YYYY"}
                        />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
                <Col span={8}>
                  <Field name={"nationality"} validate={required}>
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="สัญชาติ"
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Select {...input} {...rest} allowClear>
                          {Object.entries(Nationality).map(
                            ([value, display]) => (
                              <Select.Option value={value} key={display}>
                                {t(display)}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col>
                  <Field name={"national_id"} validate={nationalIdValue}>
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="เลขบัตรประชาชน"
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Input {...input} {...rest} />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Field name={"gender"} type="radio" validate={required}>
                    {({ input, meta }) => (
                      <Form.Item
                        label={"เพศ"}
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Radio.Group
                          {...input}
                          value={values?.gender ?? undefined}
                          options={Object.values(GENDER).filter((item) =>
                            isNaN(Number(item))
                          )}
                        />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col>
                  <Field
                    name={"phone_number"}
                    validate={composeValidators(required, phoneNumberValue)}
                  >
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="หมายเลขโทรศัพท์มือถือ"
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Input {...input} {...rest} />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col>
                  <Field
                    label="หนังสือเดินทาง"
                    name={"passport_id"}
                    validate={passportValue}
                  >
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="หนังสือเดินทาง"
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Input {...input} {...rest} />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16} justify={"space-between"}>
                <Col>
                  <Field
                    label="เงินเดือนที่คาดหวัง"
                    name={"expected_salary"}
                    validate={required}
                  >
                    {({ input, meta, ...rest }) => (
                      <Form.Item
                        label="เงินเดือนที่คาดหวัง"
                        required
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Input {...input} {...rest} type="number" />
                      </Form.Item>
                    )}
                  </Field>
                </Col>
                <Col>
                  <Space>
                    <Button
                      htmlType="button"
                      onClick={() => {
                        if (current !== undefined)
                          dispatch(clearCurrentPerson());
                        form.restart();
                      }}
                    >
                      ล้างข้อมูล
                    </Button>
                    <button type="submit">ส่งข้อมูล</button>
                  </Space>
                </Col>
              </Row>
              <pre>{JSON.stringify(values, undefined, 2)}</pre>
            </Form>
          )}
        />
      </div>
      <Table dataSource={persons} columns={columns} />
    </>
  );
}
