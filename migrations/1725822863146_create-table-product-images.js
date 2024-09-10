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
    },
    origin_created_at: {
      type: "timestamp",
    },
    origin_updated_at: {
      type: "timestamp",
    },
    alt: {
      type: "varchar(255)",
    },
    width: {
      type: "integer",
    },
    height: {
      type: "integer",
    },
    src: {
      type: "varchar(255)",
    },
    origin_variant_ids: {
      type: "bigint[]",
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

  pgm.addConstraint("product_images", "unique_id_product_images", {
    unique: ["product_id", "origin_id"],
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
