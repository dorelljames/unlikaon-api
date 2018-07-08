'use strict';

/**
 * Business.js controller
 *
 * @description: A set of functions called "actions" for managing `Business`.
 */

module.exports = {

  /**
   * Retrieve business records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.business.fetchAll(ctx.query);
  },

  /**
   * Retrieve a business record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.business.fetch(ctx.params);
  },

  /**
   * Count business records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.business.count(ctx.query);
  },

  /**
   * Create a/an business record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.business.add(ctx.request.body);
  },

  /**
   * Update a/an business record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.business.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an business record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.business.remove(ctx.params);
  }
};
