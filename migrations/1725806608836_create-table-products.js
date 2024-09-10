/* eslint-disable no-undef */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("products", {
    id: "id",
    origin_id: { type: "bigint", notNull: true },
    title: { type: "text", notNull: true },
    body_html: { type: "text" },
    vendor: { type: "text" },
    product_type: { type: "text" },
    origin_created_at: { type: "timestamp" },
    handle: { type: "text", notNull: true },
    origin_updated_at: { type: "timestamp" },
    published_at: { type: "timestamp" },
    template_suffix: { type: "text" },
    published_scope: { type: "text" },
    tags: { type: "text" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.addConstraint("products", "unique_id_products", {
    unique: ["origin_id", "handle"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("products");
};
