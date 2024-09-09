/* eslint-disable no-undef */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("product_images", {
    id: "id",
    product_id: {
      type: "integer",
      notNull: true,
      references: '"products"(id)',
      onDelete: "CASCADE",
    },
    origin_id: {
      type: "bigint",
      notNull: true,
    },
    origin_product_id: {
      type: "bigint",
      notNull: true,
    },
    position: {
      type: "integer",
      notNull: true,
    },
    origin_created_at: {
      type: "timestamp",
      notNull: true,
    },
    origin_updated_at: {
      type: "timestamp",
      notNull: true,
    },
    alt: {
      type: "varchar(255)",
      notNull: false,
    },
    width: {
      type: "integer",
      notNull: true,
    },
    height: {
      type: "integer",
      notNull: true,
    },
    src: {
      type: "varchar(255)",
      notNull: true,
    },
    origin_variant_ids: {
      type: "bigint[]",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("product_images");
};
