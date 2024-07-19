class SettingsListDto {

    /**
     * @param {Array<Settings>}settings
     * @returns {Array<Object<name: string, value: string>>}
     */
  static populate(settings) {
    return settings.map(({ name, value }) => ({ name, value }));
  }
}

export default SettingsListDto;
