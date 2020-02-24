import * as Yup from 'yup';
import Vehicle from '../models/Vehicle';
import Models from '../models/Models';

class VehicleController {
  async store(req, res) {
    const schema = Yup.object().shape({
      brand_id: Yup.number().required(),
      model_id: Yup.number().required(),
      name: Yup.string().required(),
      value: Yup.number().required(),
      year_model: Yup.number().required(),
      fuel: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { brand_id, model_id, name, value, year_model, fuel } = req.body;

    const vehicle = await Vehicle.create({
      brand_id,
      model_id,
      name,
      value,
      year_model,
      fuel,
    });

    return res.status(201).json(vehicle);
  }

  async show(req, res) {
    const { id } = req.params;

    const vehicle = await Vehicle.findByPk(id);
    if (vehicle == null) {
      return res.status(400).json({ error: 'Vehicle not found.' });
    }
    return res.json(vehicle);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      brand_id: Yup.number().required(),
      model_id: Yup.number().required(),
      name: Yup.string().required(),
      value: Yup.number().required(),
      year_model: Yup.number().required(),
      fuel: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    if (vehicle == null) {
      return res.status(400).json({ error: 'Vehicle not found.' });
    }

    Vehicle.update(req.body);

    return res.status(200).json(vehicle);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const vehicle = await Vehicle.findByPk(id);
    if (Vehicle == null) {
      return res.status(400).json({ error: 'Vehicle not found.' });
    }

    Vehicle.remove(id);

    return res.status(200).json({ message: 'Vehicle deleted' });
  }

  async index(req, res) {
    const { modelId } = req.params;

    const vehicle = await Vehicle.findAll({
      where: {
        model_id: modelId,
      },
      include: [
        {
          model: Models,
          as: 'model',
          attributes: ['name'],
        },
      ],
      order: ['value'],
    });

    return res.status(200).json(vehicle);
  }
}

export default new VehicleController();
