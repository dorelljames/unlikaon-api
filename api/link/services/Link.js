'use strict';

/**
 * Link.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all links.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('link', params);
    // Select field to populate.
    const populate = Link.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Link
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an link.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Link.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Link
      .findOne(_.pick(params, _.keys(Link.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count links.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('link', params);

    return Link
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an link.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Link.associations.map(ast => ast.alias));
    const data = _.omit(values, Link.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Link.create(data);

    // Create relational data and return the entry.
    return Link.updateRelations({ id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an link.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Link.associations.map(a => a.alias));
    const data = _.omit(values, Link.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Link.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Link.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an link.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Link.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Link
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Link.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  }
};
