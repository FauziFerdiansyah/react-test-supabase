import React from 'react';
import './style.css';

import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

const supabaseUrl = 'https://lvtnvrwqyfiwbuvygfdi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTY3MjAzMywiZXhwIjoxOTUxMjQ4MDMzfQ.yTq672NfBsxJI3y4deaggjaPIqu143ji5THFE-nDXEg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [user_id, setUser] = useState('');
  const [delivery_address, setD_Addr] = useState('');
  const [contact_number, setC_Numb] = useState('');
  const [contact_person, setC_Pers] = useState('');
  const [data_table, dataTable] = useState('');

  useEffect(async () => {
    const { data, error } = await supabase.from('customer_address').select();
    dataTable(
      data.map((cst_addr, index) => {
        return (
          <tr key={cst_addr.user_id}>
            <td>{cst_addr.user_id}</td>
            <td>{cst_addr.delivery_address}</td>
            <td>{cst_addr.contact_number}</td>
            <td>{cst_addr.contact_person}</td>
          </tr>
        );
      })
    );
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { data, error } = await supabase.from('customer_address').insert([
      {
        //user_id: 'The Shire',
        user_id: user_id,
        delivery_address: delivery_address,
        contact_number: contact_number,
        contact_person: contact_person,
      },
    ]);
    if (data) {
      setUser('');
      setD_Addr('');
      setC_Numb('');
      setC_Pers('');
    }
  };
  return (
    <div class="container mt-2">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="delivery_address" class="form-label">
            Delivery Address
          </label>
          <textarea
            value={delivery_address}
            type="email"
            class="form-control"
            id="delivery_address"
            onChange={(e) => setD_Addr(e.target.value)}
          >
            {delivery_address}
          </textarea>
        </div>
        <div class="mb-3">
          <label htmlFor="contact_number" class="form-label">
            Contact Number
          </label>
          <input
            defaultValue={contact_number}
            type="text"
            class="form-control"
            id="contact_number"
            value={contact_number}
            onChange={(e) => setC_Numb(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="contact_person" class="form-label">
            Contact Person
          </label>
          <input
            defaultValue={contact_person}
            type="text"
            class="form-control"
            id="contact_person"
            value={contact_person}
            onChange={(e) => setC_Pers(e.target.value)}
          />
        </div>
        <button type="reset" class="btn btn-default">
          Reset
        </button>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Delivery Address</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Contact Person</th>
          </tr>
        </thead>
        <tbody>
          {data_table}
          {/* {data_table[0].map((cst_addr, index) => {
            const { id_usr, del_addr, con_num, con_per } = cst_addr;
            return (
              <tr key={id_usr}>
                <td>{id_usr}</td>
                <td>{del_addr}</td>
                <td>{con_num}</td>
                <td>{con_per}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
}
