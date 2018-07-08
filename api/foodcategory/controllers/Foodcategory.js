'use strict';

/**
 * Foodcategory.js controller
 *
 * @description: A set of functions called "actions" for managing `Foodcategory`.
 */

module.exports = {

  /**
   * Retrieve foodcategory records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.foodcategory.fetchAll(ctx.query);
  },

  /**
   * Retrieve a foodcategory record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.foodcategory.fetch(ctx.params);
  },

  /**
   * Count foodcategory records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.foodcategory.count(ctx.query);
  },

  /**
   * Create a/an foodcategory record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.foodcategory.add(ctx.request.body);
  },

  /**
   * Update a/an foodcategory record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.foodcategory.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an foodcategory record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.foodcategory.remove(ctx.params);
  }
};
