/* eslint-disable no-undef */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("product_options", {
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
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    position: {
      type: "integer",
    },
    values: {
      type: "text[]",
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

  pgm.addConstraint("product_options", "unique_id_product_options", {
    unique: ["product_id", "origin_id"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("product_options");
};
