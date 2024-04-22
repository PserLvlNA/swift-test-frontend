import react, { useState } from "react";
import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";

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
} from "antd";
import type { FormProps } from "antd";
import { Form as FinalForm, Field } from "react-final-form";

import {
  GENDER,
  Nationality,
  PersonFormModel,
  Prefix,
} from "../../model/person";
import { useTranslation } from "react-i18next";

export function PersonForm(person?: PersonFormModel) {
  const { t } = useTranslation();

  const required = (value: any) => (value ? undefined : "Required");
  const mustBeNumber = (value: number) =>
    isNaN(value) ? "Must be a number" : undefined;
  const exactValue = (exact: number) => (value: number) =>
    isNaN(value) || value == exact ? undefined : `Should be ${exact} digits`;
  const nationalIdValue = (value: string) =>
    value && /^[0-9]\d{12}$/.test(value) ? "invalid" : undefined;
  const phoneNumberValue = (value: string) =>
    value && /^(0[689]{1})+([0-9]{8})$/.test(value) ? "invalid" : undefined;
  const passportValue = (value: string) =>
    value && /^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(value) ? "invalid" : undefined;
  const composeValidators =
    (...validators: any[]) =>
    (value: any) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

  return (
    <>
      <Row justify={"center"}>
        <Col span={12}>
          <FinalForm
            onSubmit={() => {}}
            name="person"
            render={() => (
              <Form>
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
                      name={"prefix"}
                      rules={[{ required: true }]}
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
                <Field
                  //   label="ชื่อจริง"
                  name={"first_name"}
                  //   rules={[{ required: true }]}
                  validate={required}
                >
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="ชื่อจริง"
                      name={"first_name"}
                      rules={[{ required: true }]}
                      validateStatus={
                        meta.touched && meta.invalid ? "error" : "success"
                      }
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <Input {...input} {...rest} />
                    </Form.Item>
                  )}
                </Field>
                <Field label="นามสกุล" name={"last_name"} validate={required}>
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="นามสกุล"
                      name={"last_name"}
                      rules={[{ required: true }]}
                      validateStatus={
                        meta.touched && meta.invalid ? "error" : "success"
                      }
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <Input {...input} {...rest} />
                    </Form.Item>
                  )}
                </Field>
                <Field name={"date_of_birth"} validate={required}>
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="วันเกิด"
                      name={"date_of_birth"}
                      rules={[{ required: true }]}
                      validateStatus={
                        meta.touched && meta.invalid ? "error" : "success"
                      }
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <DatePicker {...input} {...rest} />
                    </Form.Item>
                  )}
                </Field>
                <Field name={"nationality"} validate={required}>
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="สัญชาติ"
                      name={"nationality"}
                      rules={[{ required: true }]}
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <Select {...input} {...rest} allowClear>
                        {Object.entries(Nationality).map(([value, display]) => (
                          <Select.Option value={value} key={display}>
                            {t(display)}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Field>
                <Field name={"national_id"} validate={nationalIdValue}>
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="เลขบัตรประชาชน"
                      name={"national_id"}
                      validateStatus={
                        meta.touched && meta.invalid ? "error" : "success"
                      }
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <Input {...input} {...rest} />
                    </Form.Item>
                  )}
                </Field>
                <div>
                  <Field name={"gender"} validate={required}>
                    {({ input, meta }) => (
                      <Form.Item
                        label={"เพศ"}
                        name={"gender"}
                        rules={[{ required: true }]}
                        validateStatus={
                          meta.touched && meta.invalid ? "error" : "success"
                        }
                        help={meta.touched && meta.invalid ? meta.error : ""}
                      >
                        <Radio.Group
                          options={Object.values(GENDER).filter((item) =>
                            isNaN(Number(item))
                          )}
                        />
                      </Form.Item>
                    )}
                  </Field>
                </div>

                <Field
                  name={"phone_number"}
                  validate={composeValidators(required, phoneNumberValue)}
                >
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="เบอร์โทรศัพท์"
                      name={"phone_number"}
                      rules={[{ required: true }]}
                      validateStatus={
                        meta.touched && meta.invalid ? "error" : "success"
                      }
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <Input {...input} {...rest} />
                    </Form.Item>
                  )}
                </Field>
                <Field
                  label="หนังสือเดินทาง"
                  name={"passport_id"}
                  validate={passportValue}
                >
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="หนังสือเดินทาง"
                      name={"passport_id"}
                      validateStatus={
                        meta.touched && meta.invalid ? "error" : "success"
                      }
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <Input {...input} {...rest} />
                    </Form.Item>
                  )}
                </Field>
                <Field
                  label="เงินเดือนที่คาดหวัง"
                  name={"expected_salary"}
                  validate={required}
                >
                  {({ input, meta, ...rest }) => (
                    <Form.Item
                      label="เงินเดือนที่คาดหวัง"
                      name={"expected_salary"}
                      rules={[{ required: true }]}
                      validateStatus={
                        meta.touched && meta.invalid ? "error" : "success"
                      }
                      help={meta.touched && meta.invalid ? meta.error : ""}
                    >
                      <Input {...input} {...rest} type="number" />
                    </Form.Item>
                  )}
                </Field>
                <Space>
                  <Button type="primary" htmlType="submit">
                    ส่งข้อมูล
                  </Button>
                  <Button htmlType="button" onClick={() => {}}>
                    ล้างข้อมูล
                  </Button>
                </Space>
              </Form>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
