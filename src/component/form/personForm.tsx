import react from "react";
import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import {
  Col,
  Form,
  Row,
  Button,
  Input,
  Checkbox,
  DatePicker,
  Select,
  Radio,
} from "antd";
import type { FormProps } from "antd";

import {
  setPrefix,
  setFirstName,
  setLastName,
  setDOB,
  setNationality,
  setnationalId,
  setGender,
  setPhoneNumber,
  setExpectedSalary,
} from "../../features/persons/personsSlice";
import { GENDER, Nationality, PersonFormModel, Prefix } from "../../model/person";
import { useTranslation } from "react-i18next";

export function PersonForm(person?: PersonFormModel) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    prefix,
    first_name,
    last_name,
    date_of_birth,
    nationality,
    national_id,
    gender,
    phone_number,
    passport_id,
    expected_salary,
  } = useSelector((state: PersonFormModel) => state);

  const [form] = Form.useForm();

  return (
    <>
      <Row justify={"center"}>
        <Col span={12} style={{ border: "1px #242424" }}>
          <p>form</p>
          <Form form={form} name="person">
            <Form.Item
              label="คำนำหน้า"
              name={"prefix"}
              rules={[{ required: true }]}
            >
              <Select value={prefix} onChange={(e) => setPrefix(e)}>
                {Object.entries(Prefix).map(([value, display]) => (
                  <Select.Option value={value} key={display}>
                    {t(display)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="ชื่อจริง"
              name={"first_name"}
              rules={[{ required: true }]}
            >
              <Input value={first_name} />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name={"last_name"}
              rules={[{ required: true }]}
            >
              <Input value={last_name} />
            </Form.Item>
            <Form.Item
              label="วันเกิด"
              name={"date_of_birth"}
              rules={[{ required: true }]}
            >
              <DatePicker value={date_of_birth} />
            </Form.Item>
            <Form.Item
              label="สัญชาติ"
              name={"nationality"}
              rules={[{ required: true }]}
            >
              <Select value={nationality} onChange={(e) => setNationality(e)}>
                {Object.entries(Nationality).map(([value, display]) => (
                  <Select.Option value={value} key={display}>
                    {t(display)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="เลขบัตรประชาชน"
              name={"national_id"}
              rules={[{ required: true, pattern: /^[0-9]\d{12}$/}]}
            >
              <Input value={national_id} />
            </Form.Item>
            <Form.Item
              label="เพศ"
              name={"gender"}
              rules={[{ required: true }]}
            >
                <Radio.Group value={gender}>
                    {Object.values(GENDER).filter((item) => isNaN(Number(item))).map((item) => (
                        <Radio value={item}>{t(String(item))}</Radio>
                    ))}
                </Radio.Group>

            </Form.Item>
            <Form.Item
              label="เบอร์โทรศัพท์"
              name={"phone_number"}
              rules={[{ required: true, pattern: /^(0[689]{1})+([0-9]{8})$/}]}
            >
              <Input value={phone_number} />
            </Form.Item>
            <Form.Item
              label="หนังสือเดินทาง"
              name={"passport_id"}
              rules={[{ pattern: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/}]}
            >
              <Input value={passport_id} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
